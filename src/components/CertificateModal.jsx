import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, Award, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-space-deep/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-space-midnight/95 border border-space-cyan/40 rounded-2xl shadow-glass flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/10 bg-space-deep/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-space-cyan/10 border border-space-cyan/30 text-space-cyan">
                <Award size={20} />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-white font-orbitron">
                  {certificate.title}
                </h3>
                <p className="text-xs text-space-gold font-mono">
                  Issued by {certificate.issuer} {certificate.date ? `• ${certificate.date}` : ''}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Certificate Content / Preview */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              {certificate.description}
            </p>

            {certificate.previewUrl ? (
              <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden border border-white/15 bg-black/40">
                <iframe
                  src={certificate.previewUrl}
                  title={certificate.title}
                  className="w-full h-full border-none"
                />
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-white/20 text-center bg-white/5">
                <ShieldCheck size={40} className="mx-auto text-space-cyan mb-2" />
                <p className="text-sm text-white/90 font-medium">
                  Official Verification Credential
                </p>
                <p className="text-xs text-white/60 mt-1">
                  Verified curriculum completed under {certificate.issuer}.
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 md:p-5 border-t border-white/10 bg-space-deep/60">
            <div className="text-xs text-white/50 font-mono">
              Status: Verified Credential
            </div>

            <div className="flex items-center gap-2">
              {certificate.previewUrl && (
                <a
                  href={certificate.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-white bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5"
                >
                  <Download size={14} /> Open Document
                </a>
              )}
              {certificate.verifyUrl && (
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-space-deep font-bold bg-space-cyan hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-glowCyan"
                >
                  <ExternalLink size={14} /> Verify on Credly
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

