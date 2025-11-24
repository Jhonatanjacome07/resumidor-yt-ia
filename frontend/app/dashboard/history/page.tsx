"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios"; 
import { AnalysisHistoryTable } from "@/components/AnalysisHistoryTable";
import { toast } from "sonner";
import PricingModal from "@/components/PricingModal";

interface Summary {
  id: number;
  video_title: string;
  summary: string;
  video_url: string;
  created_at: string;
}

export default function HistoryPage() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loadingSummaries, setLoadingSummaries] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [currentUsage, setCurrentUsage] = useState(0);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchSummaries();
    }
  }, [user, router]);
  
  const fetchSummaries = async () => {
    try {
      const response = await api.get('/api/summaries');
      setSummaries(response.data.summaries);
      if (response.data.user_info) {
        setCurrentUsage(response.data.user_info.monthly_usage_count || 0);
      }
    } catch (error) {
      console.error('Error fetching summaries:', error);
      toast.error('Error al cargar el historial');
    } finally {
      setLoadingSummaries(false);
    }
  };

  const handleDeleteSummary = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este análisis?')) {
      return;
    }

    setDeletingId(id);
    try {
      await api.delete(`/api/summaries/${id}`);
      setSummaries(summaries.filter(s => s.id !== id));
      toast.success('Análisis eliminado con éxito');
    } catch (error) {
      toast.error('Error al eliminar el análisis');
      console.error('Error deleting summary:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!user) return <div className="text-slate-900 dark:text-white p-10">Verificando sesión...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Mis Análisis</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Historial completo de tus análisis de videos</p>
        </div>

        {loadingSummaries ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            Cargando historial...
          </div>
        ) : (
          <AnalysisHistoryTable 
            summaries={summaries}
            onDelete={handleDeleteSummary}
            isDeleting={deletingId}
            onUpgrade={() => setShowPricingModal(true)}
          />
        )}
      </div>

      <PricingModal 
        open={showPricingModal}
        onOpenChange={setShowPricingModal}
        currentUsage={currentUsage}
      />
    </div>
  );
}
