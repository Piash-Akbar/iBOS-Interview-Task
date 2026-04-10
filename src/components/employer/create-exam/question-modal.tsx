"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import type { DraftQuestion } from "@/stores/create-exam-store";
import type { QuestionOption } from "@/types";

interface QuestionModalProps {
  open: boolean;
  onClose: () => void;
  editQuestion?: DraftQuestion;
  onSave: (question: DraftQuestion, addMore: boolean) => void;
  questionNumber: number;
}

const LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function createDefaultOption(index: number): QuestionOption {
  return {
    label: LABELS[index] || String(index + 1),
    text: "",
    isCorrect: false,
  };
}

function createDefaultOptions(): QuestionOption[] {
  return [createDefaultOption(0), createDefaultOption(1)];
}

export function QuestionModal({
  open,
  onClose,
  editQuestion,
  onSave,
  questionNumber,
}: QuestionModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>("MCQ");
  const [score, setScore] = useState(1);
  const [options, setOptions] = useState<QuestionOption[]>(
    createDefaultOptions()
  );

  useEffect(() => {
    if (editQuestion) {
      setTitle(editQuestion.title);
      setType(editQuestion.type);
      setScore(editQuestion.score);
      setOptions(
        editQuestion.options.length > 0
          ? editQuestion.options
          : createDefaultOptions()
      );
    } else {
      setTitle("");
      setType("MCQ");
      setScore(1);
      setOptions(createDefaultOptions());
    }
  }, [editQuestion, open]);

  const addOption = () => {
    setOptions((prev) => [...prev, createDefaultOption(prev.length)]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.map((opt, i) => ({
        ...opt,
        label: LABELS[i] || String(i + 1),
      }));
    });
  };

  const updateOptionText = (index: number, text: string) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, text } : opt))
    );
  };

  const setCorrectAnswer = (index: number) => {
    if (type === "MCQ") {
      setOptions((prev) =>
        prev.map((opt, i) => ({ ...opt, isCorrect: i === index }))
      );
    } else if (type === "Checkbox") {
      setOptions((prev) =>
        prev.map((opt, i) =>
          i === index ? { ...opt, isCorrect: !opt.isCorrect } : opt
        )
      );
    }
  };

  const handleSave = (addMore: boolean) => {
    if (!title.trim()) return;

    const question: DraftQuestion = {
      id: editQuestion?.id || crypto.randomUUID(),
      title: title.trim(),
      type,
      options: type === "Text" ? [] : options,
      score,
      order: editQuestion?.order || questionNumber,
    };

    onSave(question, addMore);

    if (addMore) {
      setTitle("");
      setType("MCQ");
      setScore(1);
      setOptions(createDefaultOptions());
    }
  };

  const handleDelete = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Question {questionNumber}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="space-y-1.5 flex-1">
              <Label>Score</Label>
              <Input
                type="number"
                min={1}
                value={score}
                onChange={(e) => setScore(Number(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-1.5 flex-1">
              <Label>Type</Label>
              <Select value={type} onValueChange={(val: string | null) => val && setType(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MCQ">MCQ</SelectItem>
                  <SelectItem value="Checkbox">Checkbox</SelectItem>
                  <SelectItem value="Text">Text</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Question Title</Label>
            <Textarea
              placeholder="Enter question title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={3}
            />
          </div>

          {type !== "Text" && (
            <div className="space-y-3">
              <Label>Options</Label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCorrectAnswer(index)}
                    className={`flex items-center gap-1.5 text-xs shrink-0 px-2 py-1 rounded-md border transition-colors ${
                      option.isCorrect
                        ? "bg-green-50 border-green-300 text-green-700 dark:bg-green-950/30 dark:border-green-700 dark:text-green-300"
                        : "border-input text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {type === "MCQ" ? (
                      <span
                        className={`size-3 rounded-full border-2 ${
                          option.isCorrect
                            ? "border-green-600 bg-green-600"
                            : "border-muted-foreground/50"
                        }`}
                      />
                    ) : (
                      <span
                        className={`size-3 rounded-[3px] border-2 ${
                          option.isCorrect
                            ? "border-green-600 bg-green-600"
                            : "border-muted-foreground/50"
                        }`}
                      />
                    )}
                    Set as correct answer
                  </button>
                  <span className="text-sm font-medium text-muted-foreground w-6 shrink-0">
                    {option.label}.
                  </span>
                  <Input
                    className="flex-1"
                    placeholder={`Option ${option.label}`}
                    value={option.text}
                    onChange={(e) => updateOptionText(index, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeOption(index)}
                    disabled={options.length <= 2}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={addOption}
                className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
              >
                <Plus className="size-3.5" />
                Another options
              </button>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSave(false)}
            >
              Save
            </Button>
            <Button type="button" onClick={() => handleSave(true)}>
              Save &amp; Add More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
