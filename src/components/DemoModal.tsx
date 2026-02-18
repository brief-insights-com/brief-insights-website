import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = (open: boolean) => {
    if (!open) setSubmitted(false);
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-status-online/10">
              <CheckCheck className="h-6 w-6 text-status-online" />
            </div>
            <DialogHeader>
              <DialogTitle>{t("demo.successTitle")}</DialogTitle>
              <DialogDescription>{t("demo.successMessage")}</DialogDescription>
            </DialogHeader>
            <Button variant="outline" onClick={() => handleClose(false)}>
              {t("demo.close")}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("demo.title")}</DialogTitle>
              <DialogDescription>{t("demo.subtitle")}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="demo-name">{t("demo.name")}</Label>
                <Input
                  id="demo-name"
                  required
                  placeholder={t("demo.namePlaceholder")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="demo-email">{t("demo.email")}</Label>
                <Input
                  id="demo-email"
                  type="email"
                  required
                  placeholder={t("demo.emailPlaceholder")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="demo-org">{t("demo.org")}</Label>
                <Input
                  id="demo-org"
                  required
                  placeholder={t("demo.orgPlaceholder")}
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="demo-message">{t("demo.message")}</Label>
                <Textarea
                  id="demo-message"
                  placeholder={t("demo.messagePlaceholder")}
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                {t("demo.submit")}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
