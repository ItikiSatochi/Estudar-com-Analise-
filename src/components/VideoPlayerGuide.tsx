import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Video, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  FileText, 
  Save, 
  BookOpen
} from 'lucide-react';
import { VideoGuide, ModuleId } from '../types';
import { moduleVideoGuides } from '../data/videoGuides';
import { buildYouTubeEmbedUrl } from '../utils/youtube';
import { useTheme } from '../context/ThemeContext';

interface Props {
  moduleId: ModuleId;
  moduleTitle?: string;
  onOpenQuest?: () => void;
}

export const VideoPlayerGuide: React.FC<Props> = ({ moduleId, moduleTitle, onOpenQuest }) => {
  const { isClean } = useTheme();

  // Curated Portuguese videos for this module
  const videos = moduleVideoGuides[moduleId] || moduleVideoGuides.overview;

  // Active selected video
  const [selectedVideoId, setSelectedVideoId] = useState<string>(videos[0]?.id || '');
  const activeVideo = videos.find(v => v.id === selectedVideoId) || videos[0];

  // Current active timestamp in seconds for playback seeking
  const [activeTimestampSeconds, setActiveTimestampSeconds] = useState<number>(0);

  // User notes for the current active video
  const notesKeyPrefix = 'datamaster_video_notes_';
  const [userNote, setUserNote] = useState<string>('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState<boolean>(false);

  // Update selected video if moduleId changes
  useEffect(() => {
    if (videos[0]) {
      setSelectedVideoId(videos[0].id);
      setActiveTimestampSeconds(0);
    }
  }, [moduleId]);

  // Load notes when active video changes
  useEffect(() => {
    if (!activeVideo) return;
    try {
      const saved = localStorage.getItem(`${notesKeyPrefix}${activeVideo.id}`);
      setUserNote(saved || '');
    } catch {
      setUserNote('');
    }
    setActiveTimestampSeconds(0);
  }, [activeVideo?.id]);

  // Save notes handler
  const handleSaveNote = () => {
    if (!activeVideo) return;
    try {
      localStorage.setItem(`${notesKeyPrefix}${activeVideo.id}`, userNote);
      setNoteSavedFeedback(true);
      setTimeout(() => setNoteSavedFeedback(false), 2000);
    } catch (e) {
      console.error('Error saving notes', e);
    }
  };

  // Jump to specific chapter
  const handleJumpToTimestamp = (seconds: number) => {
    setActiveTimestampSeconds(seconds);
  };

  if (!activeVideo) {
    return (
      <div className={`p-8 text-center rounded-xl border ${
        isClean ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-400'
      }`}>
        Nenhum vídeo disponível para este módulo.
      </div>
    );
  }

  const embedUrl = buildYouTubeEmbedUrl(activeVideo.youtubeId, activeTimestampSeconds);

  return (
    <div className="space-y-6">
      {/* Top Banner explaining YouTube Video Orientation */}
      <div className={`border rounded-xl p-5 sm:p-6 transition-colors ${
        isClean 
          ? 'bg-gradient-to-r from-rose-50/80 via-white to-indigo-50/70 border-rose-200 text-slate-800 shadow-xs' 
          : 'bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
              <span className={`px-2 py-0.5 rounded font-mono ${
                isClean ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-rose-950/80 text-rose-300 border border-rose-800/40'
              }`}>
                Vídeo Aulas em Português (PT-BR)
              </span>
              <span className={isClean ? 'text-indigo-700' : 'text-indigo-400'}>
                Mentoria & Teoria Prática
              </span>
            </div>
            <h3 className={`text-lg sm:text-xl font-black ${isClean ? 'text-slate-900' : 'text-white'}`}>
              Orientações em Vídeo: {moduleTitle || 'Módulo Atual'}
            </h3>
            <p className={`text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
              Aulas selecionadas e abertas do YouTube em português para acelerar seu aprendizado. Navegue pelos capítulos e minutos exatos abaixo para ir direto ao conceito de negócio.
            </p>
          </div>

          {onOpenQuest && (
            <button
              onClick={onOpenQuest}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all self-start sm:self-auto active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Fazer Quest do Módulo</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Video Player + Playlist / Chapters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Responsive 16:9 YouTube Player & Video Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* 16:9 Aspect Ratio Container */}
          <div className={`relative aspect-video w-full rounded-2xl overflow-hidden border shadow-lg ${
            isClean ? 'border-slate-300 bg-black' : 'border-slate-800 bg-black'
          }`}>
            <iframe
              key={`${activeVideo.youtubeId}-${activeTimestampSeconds}`}
              src={embedUrl}
              title={activeVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Video Title and Metadata Card */}
          <div className={`p-5 rounded-xl border transition-colors ${
            isClean ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  activeVideo.level === 'Executivo'
                    ? (isClean ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-purple-950/80 text-purple-300 border-purple-800/40')
                    : (isClean ? 'bg-indigo-100 text-indigo-800 border-indigo-200' : 'bg-indigo-950/80 text-indigo-300 border-indigo-800/40')
                }`}>
                  Nível: {activeVideo.level}
                </span>

                <span className={`text-xs font-medium ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
                  Canal: <strong className={isClean ? 'text-slate-900' : 'text-slate-200'}>{activeVideo.channel}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border ${
                  isClean ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  <Clock className="w-3.5 h-3.5 text-rose-500" />
                  <span>{activeVideo.duration}</span>
                </div>

                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border transition-colors ${
                    isClean 
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs' 
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                  }`}
                  title="Abrir no YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-rose-500" />
                  <span className="hidden sm:inline">Assistir no YouTube</span>
                </a>
              </div>
            </div>

            <h2 className={`text-lg sm:text-xl font-extrabold mt-3 ${isClean ? 'text-slate-900' : 'text-white'}`}>
              {activeVideo.title}
            </h2>

            <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isClean ? 'text-slate-700' : 'text-slate-300'}`}>
              {activeVideo.description}
            </p>

            {/* Key Topics */}
            {activeVideo.keyTopics && activeVideo.keyTopics.length > 0 && (
              <div className={`mt-4 p-4 rounded-xl border space-y-2 ${
                isClean ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
              }`}>
                <span className={`text-xs font-bold uppercase tracking-wider block ${
                  isClean ? 'text-indigo-800' : 'text-indigo-400'
                }`}>
                  Conceitos Práticos Abordados Nesta Aula:
                </span>
                <ul className="space-y-1.5">
                  {activeVideo.keyTopics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        isClean ? 'text-emerald-600' : 'text-emerald-400'
                      }`} />
                      <span className={isClean ? 'text-slate-800' : 'text-slate-300'}>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Student Study Notes Section */}
          <div className={`p-5 rounded-xl border space-y-3 transition-colors ${
            isClean ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className={`w-4 h-4 ${isClean ? 'text-indigo-600' : 'text-indigo-400'}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${isClean ? 'text-slate-800' : 'text-slate-200'}`}>
                  Minhas Anotações de Estudo
                </span>
              </div>

              {noteSavedFeedback && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Salvo no navegador!
                </span>
              )}
            </div>

            <textarea
              rows={3}
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="Digite aqui seus insights, pontos para discutir na reunião ou fórmulas importantes enquanto estuda..."
              className={`w-full text-xs p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed ${
                isClean 
                  ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                  : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500'
              }`}
            />

            <div className="flex items-center justify-between text-xs">
              <span className={`text-[11px] ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>
                Salvo localmente por vídeo.
              </span>

              <button
                type="button"
                onClick={handleSaveNote}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Anotação</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Playlist & Clickable Chapter Timestamps */}
        <div className="space-y-6">
          
          {/* Playlist Card */}
          <div className={`p-4 rounded-xl border space-y-3 transition-colors ${
            isClean ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className={`text-xs font-bold uppercase tracking-wider ${isClean ? 'text-slate-800' : 'text-slate-200'}`}>
                Aulas Recomendadas ({videos.length})
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                isClean ? 'bg-rose-100 text-rose-800' : 'bg-rose-950 text-rose-300'
              }`}>
                Português (PT-BR)
              </span>
            </div>

            <div className="space-y-2">
              {videos.map((video) => {
                const isCurrent = video.id === activeVideo.id;

                return (
                  <div
                    key={video.id}
                    onClick={() => {
                      setSelectedVideoId(video.id);
                      setActiveTimestampSeconds(0);
                    }}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                      isCurrent
                        ? (isClean 
                            ? 'bg-rose-50/90 border-rose-300 ring-1 ring-rose-300 shadow-xs' 
                            : 'bg-rose-950/60 border-rose-700 ring-1 ring-rose-700')
                        : (isClean 
                            ? 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700' 
                            : 'bg-slate-950/50 hover:bg-slate-800/80 border-slate-800/80 text-slate-400')
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isCurrent 
                        ? 'bg-rose-600 text-white shadow-xs' 
                        : (isClean ? 'bg-slate-200 text-slate-600' : 'bg-slate-800 text-slate-400')
                    }`}>
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className={`text-xs font-bold leading-tight ${
                        isCurrent 
                          ? (isClean ? 'text-rose-950' : 'text-white') 
                          : (isClean ? 'text-slate-900' : 'text-slate-300')
                      }`}>
                        {video.title}
                      </h4>

                      <div className="flex items-center gap-2 mt-1 text-[11px]">
                        <span className={isClean ? 'text-slate-600' : 'text-slate-400'}>{video.channel}</span>
                        <span className={isClean ? 'text-slate-300' : 'text-slate-600'}>·</span>
                        <span className={`font-mono font-semibold ${isClean ? 'text-slate-700' : 'text-slate-300'}`}>{video.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Chapter Timestamps */}
          {activeVideo.timestamps && activeVideo.timestamps.length > 0 && (
            <div className={`p-4 rounded-xl border space-y-3 transition-colors ${
              isClean ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className={`text-xs font-bold uppercase tracking-wider ${isClean ? 'text-slate-800' : 'text-slate-200'}`}>
                  Capítulos & Minutagem
                </span>
                <span className={`text-[11px] ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>
                  Clique para pular
                </span>
              </div>

              <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                {activeVideo.timestamps.map((chapter, idx) => {
                  const isCurrentTime = activeTimestampSeconds === chapter.seconds;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleJumpToTimestamp(chapter.seconds)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all border ${
                        isCurrentTime
                          ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold shadow-xs dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
                          : (isClean 
                              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800' 
                              : 'bg-slate-950/40 hover:bg-slate-800 border-slate-800 text-slate-300')
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <Play className={`w-3 h-3 flex-shrink-0 ${
                          isCurrentTime ? 'text-rose-600 fill-current' : 'text-slate-400'
                        }`} />
                        <span className="truncate">{chapter.label}</span>
                      </div>

                      <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded flex-shrink-0 ${
                        isCurrentTime
                          ? 'bg-rose-600 text-white font-bold'
                          : (isClean ? 'bg-slate-200 text-slate-800 font-medium' : 'bg-slate-800 text-slate-300 font-medium')
                      }`}>
                        {chapter.time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Tip Card */}
          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            isClean 
              ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950' 
              : 'bg-indigo-950/30 border-indigo-900/40 text-indigo-200'
          }`}>
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Fixação Imediata:</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Após assistir à aula, acesse a aba <strong>Desafio de Fixação (Quest)</strong> deste módulo para responder a perguntas reais de entrevistas e conselhos de administração!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
