"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ExternalLink, History } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Summary {
  id: number;
  video_title: string;
  summary: string;
  video_url: string;
  created_at: string;
}

interface AnalysisHistoryTableProps {
  summaries: Summary[];
  onDelete: (id: number) => void;
  isDeleting: number | null;
}

export function AnalysisHistoryTable({ summaries, onDelete, isDeleting }: AnalysisHistoryTableProps) {


  return (
    <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-slate-900 dark:text-white">
          <History className="text-blue-400" size={20} />
          Mis Análisis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {summaries.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <History className="mx-auto mb-4 opacity-50" size={48} />
            <p>No tienes análisis guardados aún.</p>
            <p className="text-sm mt-2">Analiza tu primer video para comenzar.</p>
          </div>
        ) : (
            <div className="relative">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 dark:border-slate-800">
                    <TableHead className="text-slate-700 dark:text-slate-300 w-[30%]">Título del Video</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300 hidden md:table-cell w-[40%]">Resumen</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300 w-[15%]">Fecha</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300 text-center w-[15%]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaries.slice(0, 5).map((summary) => (
                    <TableRow key={summary.id} className="border-slate-200 dark:border-slate-800">
                      <TableCell className="font-medium text-slate-900 dark:text-white">
                        <div className="max-w-xs truncate">
                          {summary.video_title}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 hidden md:table-cell">
                        <div className="max-w-md truncate">
                          {summary.summary}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        <div className="whitespace-nowrap">
                          {format(new Date(summary.created_at), "dd MMM yyyy", { locale: es })}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(summary.video_url, '_blank')}
                            className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
                          >
                            <ExternalLink size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(summary.id)}
                            disabled={isDeleting === summary.id}
                            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {/* Dummy Blurred Rows */}
                  {[1, 2, 3].map((i) => (
                    <TableRow key={`dummy-${i}`} className="border-slate-200 dark:border-slate-800 opacity-50 blur-[2px] select-none pointer-events-none">
                      <TableCell className="font-medium text-slate-900 dark:text-white">
                        <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="h-5 w-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-full" />
                          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-full" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Upgrade Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-white via-white/90 to-transparent dark:from-slate-900 dark:via-slate-900/90 dark:to-transparent flex flex-col items-center justify-end pb-8">
                <p className="text-slate-600 dark:text-slate-300 font-medium mb-3">
                  Ver historial completo
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 shadow-lg shadow-blue-500/20">
                  Actualizar Plan
                </Button>
              </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
