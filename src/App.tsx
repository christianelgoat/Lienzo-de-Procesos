import React, { useState, useMemo } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ROWS = [
  'Gobernanza',
  'Alcance',
  'Cronograma',
  'Finanzas',
  'Interesados',
  'Recursos',
  'Riesgos',
];

const COLS = [
  'Inicio',
  'Planificación',
  'Ejecución',
  'Monitoreo y control',
  'Cierre',
];

const CORRECT_MAPPING: Record<number, { row: string; col: string }> = {
  1: { row: 'Recursos', col: 'Ejecución' },
  2: { row: 'Alcance', col: 'Planificación' },
  3: { row: 'Alcance', col: 'Planificación' },
  4: { row: 'Finanzas', col: 'Planificación' },
  5: { row: 'Cronograma', col: 'Planificación' },
  6: { row: 'Finanzas', col: 'Planificación' },
  7: { row: 'Recursos', col: 'Planificación' },
  8: { row: 'Gobernanza', col: 'Monitoreo y control' },
  9: { row: 'Gobernanza', col: 'Cierre' },
  10: { row: 'Alcance', col: 'Planificación' },
  11: { row: 'Gobernanza', col: 'Ejecución' },
  12: { row: 'Gobernanza', col: 'Ejecución' },
  13: { row: 'Gobernanza', col: 'Ejecución' },
  14: { row: 'Interesados', col: 'Ejecución' },
  15: { row: 'Interesados', col: 'Ejecución' },
  16: { row: 'Interesados', col: 'Inicio' },
  17: { row: 'Riesgos', col: 'Planificación' },
  18: { row: 'Riesgos', col: 'Ejecución' },
  19: { row: 'Gobernanza', col: 'Inicio' },
  20: { row: 'Gobernanza', col: 'Planificación' },
  21: { row: 'Recursos', col: 'Ejecución' },
  22: { row: 'Interesados', col: 'Monitoreo y control' },
  23: { row: 'Interesados', col: 'Monitoreo y control' },
  24: { row: 'Riesgos', col: 'Monitoreo y control' },
  25: { row: 'Cronograma', col: 'Monitoreo y control' },
  26: { row: 'Gobernanza', col: 'Monitoreo y control' },
  27: { row: 'Finanzas', col: 'Monitoreo y control' },
  28: { row: 'Recursos', col: 'Monitoreo y control' },
  29: { row: 'Alcance', col: 'Monitoreo y control' },
  30: { row: 'Alcance', col: 'Planificación' },
  31: { row: 'Interesados', col: 'Planificación' },
  32: { row: 'Interesados', col: 'Planificación' },
  33: { row: 'Gobernanza', col: 'Planificación' },
  34: { row: 'Recursos', col: 'Planificación' },
  35: { row: 'Riesgos', col: 'Planificación' },
  36: { row: 'Cronograma', col: 'Planificación' },
  37: { row: 'Finanzas', col: 'Planificación' },
  38: { row: 'Riesgos', col: 'Planificación' },
  39: { row: 'Riesgos', col: 'Planificación' },
  40: { row: 'Alcance', col: 'Monitoreo y control' },
};

const PROCESSES = [
  { id: 1, name: 'Adquirir recursos' },
  { id: 2, name: 'Definir alcance' },
  { id: 3, name: 'Desarrollar la estructura del alcance' },
  { id: 4, name: 'Elaborar el presupuesto' },
  { id: 5, name: 'Elaborar un cronograma' },
  { id: 6, name: 'Estimar los costos' },
  { id: 7, name: 'Estimar recursos' },
  { id: 8, name: 'Evaluar e implementar cambios' },
  { id: 9, name: 'Finalizar el proyecto o fase' },
  { id: 10, name: 'Gestión del alcance del plan' },
  { id: 11, name: 'Gestionar el aseguramiento de la calidad' },
  { id: 12, name: 'Gestionar el conocimiento del proyecto' },
  { id: 13, name: 'Gestionar la ejecución del proyecto' },
  { id: 14, name: 'Gestionar la participación de los interesados' },
  { id: 15, name: 'Gestionar las comunicaciones' },
  { id: 16, name: 'Identificar a los interesados' },
  { id: 17, name: 'Identificar riesgos' },
  { id: 18, name: 'Implementar respuestas ante los riesgos' },
  { id: 19, name: 'Iniciar proyecto o fase' },
  { id: 20, name: 'Integrar y alinear fases del proyecto' },
  { id: 21, name: 'Liderar equipo' },
  { id: 22, name: 'Monitorear las comunicaciones' },
  { id: 23, name: 'Monitorear las partes interesadas' },
  { id: 24, name: 'Monitorear los riesgos' },
  { id: 25, name: 'Monitorear y controlar el cronograma' },
  { id: 26, name: 'Monitorear y controlar el desempeño del proyecto' },
  { id: 27, name: 'Monitorear y controlar los costos' },
  { id: 28, name: 'Monitorear y controlar recursos' },
  { id: 29, name: 'Monitoreo y control del alcance' },
  { id: 30, name: 'Obtener y analizar requisitos' },
  { id: 31, name: 'Plan de gestión de las comunicaciones' },
  { id: 32, name: 'Plan de involucramiento a los interesados' },
  { id: 33, name: 'Planificar la estrategia de abastecimiento' },
  { id: 34, name: 'Planificar la gestión de recursos' },
  { id: 35, name: 'Planificar la gestión de riesgos' },
  { id: 36, name: 'Planificar la gestión del cronograma' },
  { id: 37, name: 'Planificar la gestión financiera' },
  { id: 38, name: 'Planificar las respuestas ante los riesgos' },
  { id: 39, name: 'Realizar análisis de riesgos' },
  { id: 40, name: 'Validar el alcance' },
];

export default function App() {
  const [placedProcesses, setPlacedProcesses] = useState<
    Record<number, { row: string; col: string }>
  >({});

  const handleAdd = (num: number, row: string, col: string) => {
    setPlacedProcesses((prev) => ({
      ...prev,
      [num]: { row, col },
    }));
  };

  const handleRemove = (num: number) => {
    setPlacedProcesses((prev) => {
      const next = { ...prev };
      delete next[num];
      return next;
    });
  };

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todo?')) {
      setPlacedProcesses({});
    }
  };

  const stats = useMemo(() => {
    let correctBoth = 0;
    let correctAmbitoOnly = 0;
    let correctAreaOnly = 0;
    let correctNeither = 0;
    
    let correctArea = 0;
    let incorrectArea = 0;
    let correctAmbito = 0;
    let incorrectAmbito = 0;

    for (let i = 1; i <= 40; i++) {
      const placed = placedProcesses[i];
      const correct = CORRECT_MAPPING[i];

      if (placed) {
        const isRowCorrect = placed.row === correct.row;
        const isColCorrect = placed.col === correct.col;

        if (isRowCorrect && isColCorrect) correctBoth++;
        else if (isRowCorrect && !isColCorrect) correctAmbitoOnly++;
        else if (!isRowCorrect && isColCorrect) correctAreaOnly++;
        else correctNeither++;
        
        if (isColCorrect) correctArea++;
        else incorrectArea++;

        if (isRowCorrect) correctAmbito++;
        else incorrectAmbito++;
      } else {
        correctNeither++;
        incorrectArea++;
        incorrectAmbito++;
      }
    }

    return {
      correctBoth,
      correctAmbitoOnly,
      correctAreaOnly,
      correctNeither,
      correctArea,
      incorrectArea,
      correctAmbito,
      incorrectAmbito,
    };
  }, [placedProcesses]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Lienzo de Procesos Interactivo
            </h1>
            <p className="text-slate-500 mt-1">
              Coloca los números de los procesos en las celdas correspondientes.
            </p>
          </div>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md font-medium transition-colors self-start md:self-auto"
          >
            Borrar Todo
          </button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300 inline-block"></span>
                <span>Correcto (Ambos)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-blue-100 border border-blue-300 inline-block"></span>
                <span>Correcto (Solo Ámbito/Fila)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-amber-100 border border-amber-300 inline-block"></span>
                <span>Correcto (Solo Área/Columna)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-rose-100 border border-rose-300 inline-block"></span>
                <span>Incorrecto</span>
              </div>
            </div>

            {/* Grid */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-6 border-b border-slate-200">
                  <div className="bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200 flex items-center justify-center text-center">
                    Ámbito \ Área
                  </div>
                  {COLS.map((col) => (
                    <div
                      key={col}
                      className="bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200 last:border-r-0 flex items-center justify-center text-center"
                    >
                      {col}
                    </div>
                  ))}
                </div>

                {ROWS.map((row) => (
                  <div key={row} className="grid grid-cols-6 border-b border-slate-200 last:border-b-0">
                    <div className="bg-slate-50 p-3 font-medium text-slate-700 border-r border-slate-200 flex items-center">
                      {row}
                    </div>
                    {COLS.map((col) => (
                      <Cell
                        key={`${row}-${col}`}
                        row={row}
                        col={col}
                        placedProcesses={placedProcesses}
                        onAdd={handleAdd}
                        onRemove={handleRemove}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Summary Table */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 text-white p-4">
                <h2 className="font-semibold text-lg">Cuadro de Evaluación</h2>
              </div>
              <div className="p-0">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-medium text-slate-600"></th>
                      <th className="p-3 font-medium text-slate-600">Área de enfoque</th>
                      <th className="p-3 font-medium text-slate-600">Ámbito de desempeño</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-medium text-slate-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" /> Correctos
                      </td>
                      <td className="p-3 text-emerald-600 font-semibold text-lg">{stats.correctArea}</td>
                      <td className="p-3 text-emerald-600 font-semibold text-lg">{stats.correctAmbito}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-500" /> Incorrectos
                      </td>
                      <td className="p-3 text-rose-600 font-semibold text-lg">{stats.incorrectArea}</td>
                      <td className="p-3 text-rose-600 font-semibold text-lg">{stats.incorrectAmbito}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-bold text-slate-800">Total</td>
                      <td className="p-3 font-bold text-slate-800">40</td>
                      <td className="p-3 font-bold text-slate-800">40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Evaluation Table */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 text-white p-4">
                <h2 className="font-semibold text-lg">Detalle de Aciertos</h2>
              </div>
              <div className="p-0">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-medium text-slate-600">Categoría de Acierto</th>
                      <th className="p-3 font-medium text-slate-600 text-center">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-medium text-slate-700 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                        Acertaron en ambos
                      </td>
                      <td className="p-3 text-center font-semibold text-lg text-emerald-600">{stats.correctBoth}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-700 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                        Acertaron en ámbito de desempeño
                      </td>
                      <td className="p-3 text-center font-semibold text-lg text-blue-600">{stats.correctAmbitoOnly}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-700 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                        Acertaron en área de enfoque
                      </td>
                      <td className="p-3 text-center font-semibold text-lg text-amber-600">{stats.correctAreaOnly}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-700 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                        Acertaron en ninguno
                      </td>
                      <td className="p-3 text-center font-semibold text-lg text-rose-600">{stats.correctNeither}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-bold text-slate-800">Total de Procesos</td>
                      <td className="p-3 text-center font-bold text-slate-800">40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Process List */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col h-[600px]">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                <h2 className="font-semibold text-slate-800">Lista de Procesos</h2>
              </div>
              <div className="p-4 overflow-y-auto flex-1 space-y-1">
                {PROCESSES.map((proc) => {
                  const isPlaced = !!placedProcesses[proc.id];
                  return (
                    <div
                      key={proc.id}
                      className={`flex items-start gap-3 p-2 rounded-md transition-colors ${
                        isPlaced ? 'opacity-50 bg-slate-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold shrink-0">
                        {proc.id}
                      </span>
                      <span className={`text-sm ${isPlaced ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {proc.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell({
  row,
  col,
  placedProcesses,
  onAdd,
  onRemove,
}: {
  row: string;
  col: string;
  placedProcesses: Record<number, { row: string; col: string }>;
  onAdd: (num: number, row: string, col: string) => void;
  onRemove: (num: number) => void;
}) {
  const [inputValue, setInputValue] = useState('');

  const processesInCell = Object.entries(placedProcesses)
    .filter(([_, pos]) => pos.row === row && pos.col === col)
    .map(([id]) => parseInt(id));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      const num = parseInt(inputValue.trim());
      if (!isNaN(num) && num >= 1 && num <= 40) {
        onAdd(num, row, col);
        setInputValue('');
      }
    }
  };

  return (
    <div className="border-r border-slate-200 last:border-r-0 p-2 min-h-[100px] flex flex-col gap-2 bg-white hover:bg-slate-50 transition-colors group">
      <div className="flex flex-wrap gap-1.5">
        {processesInCell.map((num) => {
          const isCorrectRow = CORRECT_MAPPING[num].row === row;
          const isCorrectCol = CORRECT_MAPPING[num].col === col;

          let bgColor = 'bg-slate-100 text-slate-700 border-slate-300';
          if (isCorrectRow && isCorrectCol) {
            bgColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
          } else if (isCorrectRow) {
            bgColor = 'bg-blue-100 text-blue-800 border-blue-300';
          } else if (isCorrectCol) {
            bgColor = 'bg-amber-100 text-amber-800 border-amber-300';
          } else {
            bgColor = 'bg-rose-100 text-rose-800 border-rose-300';
          }

          return (
            <span
              key={num}
              className={`px-2 py-1 rounded-md text-sm border flex items-center gap-1.5 font-medium shadow-sm transition-transform hover:scale-105 ${bgColor}`}
              title={PROCESSES.find((p) => p.id === num)?.name}
            >
              {num}
              <button
                onClick={() => onRemove(num)}
                className="opacity-60 hover:opacity-100 focus:outline-none"
                aria-label="Remove"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </span>
          );
        })}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.replace(/[^0-9]/g, ''))}
        onKeyDown={handleKeyDown}
        placeholder="Nº + Enter"
        className="mt-auto border-b-2 border-transparent outline-none text-sm w-full p-1 bg-transparent focus:border-blue-500 transition-colors placeholder:text-slate-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
      />
    </div>
  );
}
