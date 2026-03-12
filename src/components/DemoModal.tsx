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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_DEMO_API_URL;
    
    // Fallback for local development if endpoint isn't set yet
    if (!apiUrl) {
      console.warn("VITE_DEMO_API_URL is not set. Simulating successful submission.");
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request.");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Demo request error:", err);
      setError("Something went wrong. Please try again or email us directly at sales@brief-insights.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset state when closing so it's fresh for next time
      setTimeout(() => {
        setSubmitted(false);
        setError(null);
        setForm({ name: "", email: "", org: "", message: "" });
      }, 300); // Wait for modal exit animation
    }
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
              <DialogTitle>{t("demo.successTitle", "Request Received")}</DialogTitle>
              <DialogDescription>{t("demo.successMessage", "We'll be in touch shortly to schedule your demo.")}</DialogDescription>
            </DialogHeader>
            <Button variant="outline" onClick={() => handleClose(false)}>
              {t("demo.close", "Close")}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("demo.title", "Request a Demo")}</DialogTitle>
              <DialogDescription>{t("demo.subtitle", "Fill out the form below and our team will get back to you.")}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="demo-name">{t("demo.name", "Full Name")}</Label>
                <Input
                  id="demo-name"
                  required
                  disabled={isSubmitting}
                  placeholder={t("demo.namePlaceholder", "Jane Doe")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="demo-email">{t("demo.email", "Work Email")}</Label>
                <Input
                  id="demo-email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder={t("demo.emailPlaceholder", "jane@company.com")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="demo-org">{t("demo.org", "Organisation")}</Label>
                <Input
                  id="demo-org"
                  required
                  disabled={isSubmitting}
                  placeholder={t("demo.orgPlaceholder", "Acme Corp")}
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="demo-message">{t("demo.message", "Message (Optional)")}</Label>
                <Textarea
                  id="demo-message"
                  disabled={isSubmitting}
                  placeholder={t("demo.messagePlaceholder", "Any specific requirements or questions?")}
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              
              {error && (
                <p className="text-sm text-status-offline font-medium pt-1">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : t("demo.submit", "Request Demo")}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
