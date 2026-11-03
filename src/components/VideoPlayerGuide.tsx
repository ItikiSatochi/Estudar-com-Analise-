import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Video, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Bookmark, 
  ExternalLink, 
  Sparkles, 
  FileText, 
  Save, 
  Download,
  AlertCircle
} from 'lucide-react';
import { VideoGuide, ModuleId } from '../types';
import { moduleVideoGuides } from '../data/videoGuides';
import { extractYouTubeId, buildYouTubeEmbedUrl, formatVideoTime } from '../utils/youtube';
import { useTheme } from '../context/ThemeContext';

interface Props {
  moduleId: ModuleId;
  moduleTitle?: string;
}

export const VideoPlayerGuide: React.FC<Props> = ({ moduleId, moduleTitle }) => {
  const { isClean } = useTheme();

  // Curated videos for this module
  const curatedVideos = moduleVideoGuides[moduleId] || moduleVideoGuides.overview;

  // Custom user-added videos stored in localStorage
  const storageKey = `datamaster_custom_videos_${moduleId}`;
  const notesKeyPrefix = 'datamaster_video_notes_';

  const [customVideos, setCustomVideos] = useState<VideoGuide[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // All available videos for current module
  const allVideos = [...curatedVideos, ...customVideos];

  // Active selected video
  const [selectedVideoId, setSelectedVideoId] = useState<string>(allVideos[0]?.id || '');
  const activeVideo = allVideos.find(v => v.id === selectedVideoId) || allVideos[0];

  // Current active timestamp in seconds for playback seeking
  const [activeTimestampSeconds, setActiveTimestampSeconds] = useState<number>(0);

  // Form to add custom YouTube video
  const [isAddingCustom, setIsAddingCustom] = useState<boolean>(false);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [customTitleInput, setCustomTitleInput] = useState<string>('');
  const [customChannelInput, setCustomChannelInput] = useState<string>('');
  const [customUrlError, setCustomUrlError] = useState<string | null>(null);

  // User notes for the current active video
  const [userNote, setUserNote] = useState<string>('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState<boolean>(false);

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

  // Save custom videos to localStorage
  const handleSaveCustomVideos = (updated: VideoGuide[]) => {
    setCustomVideos(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving custom video to localStorage', e);
    }
  };

  // Add custom YouTube video handler
  const handleAddCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomUrlError(null);

    const videoId = extractYouTubeId(customUrlInput);
    if (!videoId) {
      setCustomUrlError('URL ou ID do YouTube inválido. Ex: https://www.youtube.com/watch?v=VIDEO_ID ou https://youtu.be/VIDEO_ID');
      return;
    }

    const newVideo: VideoGuide = {
      id: `custom-${Date.now()}`,
      youtubeId: videoId,
      title: customTitleInput.trim() || `Vídeo de Orientação (${videoId})`,
      channel: customChannelInput.trim() || 'Canal Personalizado',
      duration: 'Personalizado',
      level: 'Intermediário',
      description: 'Vídeo adicionado pelo usuário para estudo e consulta corporativa.',
      timestamps: [
        { time: '00:00', seconds: 0, label: 'Início do vídeo' }
      ],
      keyTopics: [
        'Conteúdo personalizado adicionado para consulta do projeto corporativo',
        'Vídeo embutido diretamente via YouTube player responsivo'
      ]
    };

    const updated = [newVideo, ...customVideos];
    handleSaveCustomVideos(updated);
    setSelectedVideoId(newVideo.id);
    setCustomUrlInput('');
    setCustomTitleInput('');
    setCustomChannelInput('');
    setIsAddingCustom(false);
  };

  // Delete custom video handler
  const handleDeleteCustomVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customVideos.filter(v => v.id !== id);
    handleSaveCustomVideos(updated);
    if (selectedVideoId === id) {
      setSelectedVideoId(curatedVideos[0]?.id || '');
    }
  };

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
      <div className={`border rounded-xl p-5 transition-colors ${
        isClean 
          ? 'bg-gradient-to-r from-indigo-50/90 via-white to-purple-50/70 border-indigo-200 text-slate-800 shadow-xs' 
          : 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
              <span className={`px-2 py-0.5 rounded font-mono ${
                isClean ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-rose-950/80 text-rose-400 border border-rose-800/40'
              }`}>
                YouTube Integrado
              </span>
              <span className={isClean ? 'text-indigo-700' : 'text-indigo-400'}>
                Vídeo Aulas & Mentoria Executiva
              </span>
            </div>
            <h3 className={`text-lg sm:text-xl font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
              Orientações em Vídeo para {moduleTitle || 'este Módulo'}
            </h3>
            <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
              Assista a masterclasses de especialistas, navegue por capítulos com um clique ou adicione seus próprios links do YouTube para centralizar sua videoteca corporativa.
            </p>
          </div>

          <button
            onClick={() => setIsAddingCustom(!isAddingCustom)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-all border shadow-xs self-start sm:self-auto ${
              isAddingCustom
                ? (isClean ? 'bg-slate-200 text-slate-800 border-slate-300' : 'bg-slate-800 text-slate-200 border-slate-700')
                : 'bg-rose-600 hover:bg-rose-700 text-white border-rose-600 shadow-rose-600/20'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{isAddingCustom ? 'Fechar Formulário' : 'Adicionar Vídeo do YouTube'}</span>
          </button>
        </div>

        {/* Form to add custom YouTube video */}
        {isAddingCustom && (
          <form 
            onSubmit={handleAddCustomVideo}
            className={`mt-4 pt-4 border-t space-y-3 ${isClean ? 'border-indigo-200' : 'border-slate-800'}`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" />
              <span>Vincular Novo Vídeo do YouTube</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className={`text-xs font-semibold ${isClean ? 'text-slate-700' : 'text-slate-300'}`}>
                  URL ou ID do YouTube *
                </label>
                <input
                  type="text"
                  required
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="Ex: https://www.youtube.com/watch?v=8EMW7io4rSI ou 8EMW7io4rSI"
                  className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isClean 
                      ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' 
                      : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-semibold ${isClean ? 'text-slate-700' : 'text-slate-300'}`}>
                  Nome do Canal / Instrutor
                </label>
                <input
                  type="text"
                  value={customChannelInput}
                  onChange={(e) => setCustomChannelInput(e.target.value)}
                  placeholder="Ex: Talks at Google, Canal Interno"
                  className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isClean 
                      ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' 
                      : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-semibold ${isClean ? 'text-slate-700' : 'text-slate-300'}`}>
                Título da Aula / Orientação (Opcional)
              </label>
              <input
                type="text"
                value={customTitleInput}
                onChange={(e) => setCustomTitleInput(e.target.value)}
                placeholder="Ex: Treinamento de Storytelling e Gráficos da Diretoria"
                className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isClean 
                    ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' 
                    : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500'
                }`}
              />
            </div>

            {customUrlError && (
              <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{customUrlError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
                  isClean ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
              >
                Salvar e Assistir Vídeo
              </button>
            </div>
          </form>
        )}
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
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  activeVideo.level === 'Executivo'
                    ? (isClean ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-purple-950/80 text-purple-300 border-purple-800/40')
                    : (isClean ? 'bg-indigo-100 text-indigo-800 border-indigo-200' : 'bg-indigo-950/80 text-indigo-300 border-indigo-800/40')
                }`}>
                  Nível: {activeVideo.level}
                </span>

                <span className={`text-xs font-medium ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>
                  Canal: <strong className={isClean ? 'text-slate-800' : 'text-slate-200'}>{activeVideo.channel}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border ${
                  isClean ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{activeVideo.duration}</span>
                </div>

                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border transition-colors ${
                    isClean 
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200' 
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200 border-slate-700'
                  }`}
                  title="Abrir no YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ver no YouTube</span>
                </a>
              </div>
            </div>

            <h2 className={`text-lg sm:text-xl font-bold mt-3 ${isClean ? 'text-slate-900' : 'text-white'}`}>
              {activeVideo.title}
            </h2>

            <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isClean ? 'text-slate-700' : 'text-slate-300'}`}>
              {activeVideo.description}
            </p>

            {/* Key Topics / Resumo em Tópicos */}
            {activeVideo.keyTopics && activeVideo.keyTopics.length > 0 && (
              <div className={`mt-4 p-4 rounded-xl border space-y-2 ${
                isClean ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
              }`}>
                <span className={`text-xs font-bold uppercase tracking-wider block ${
                  isClean ? 'text-indigo-800' : 'text-indigo-400'
                }`}>
                  O que você aprende nesta orientação:
                </span>
                <ul className="space-y-1.5">
                  {activeVideo.keyTopics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        isClean ? 'text-emerald-600' : 'text-emerald-400'
                      }`} />
                      <span className={isClean ? 'text-slate-700' : 'text-slate-300'}>{topic}</span>
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
                  Salvo automaticamente!
                </span>
              )}
            </div>

            <textarea
              rows={3}
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="Digite aqui seus insights, pontos para discutir na reunião ou dúvidas enquanto assiste ao vídeo..."
              className={`w-full text-xs p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed ${
                isClean 
                  ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                  : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500'
              }`}
            />

            <div className="flex items-center justify-between text-xs">
              <span className={`text-[11px] ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>
                Salvo no seu navegador por vídeo.
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
                Aulas Disponíveis ({allVideos.length})
              </span>
              <span className={`text-[11px] font-mono ${isClean ? 'text-indigo-600' : 'text-indigo-400'}`}>
                {curatedVideos.length} Curadas · {customVideos.length} Suas
              </span>
            </div>

            <div className="space-y-2">
              {allVideos.map((video) => {
                const isCurrent = video.id === activeVideo.id;
                const isCustom = video.id.startsWith('custom-');

                return (
                  <div
                    key={video.id}
                    onClick={() => {
                      setSelectedVideoId(video.id);
                      setActiveTimestampSeconds(0);
                    }}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex items-start justify-between gap-2.5 ${
                      isCurrent
                        ? (isClean 
                            ? 'bg-indigo-50/90 border-indigo-300 ring-1 ring-indigo-300 shadow-xs' 
                            : 'bg-indigo-950/60 border-indigo-700 ring-1 ring-indigo-700')
                        : (isClean 
                            ? 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700' 
                            : 'bg-slate-950/50 hover:bg-slate-800/80 border-slate-800/80 text-slate-400')
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isCurrent 
                          ? 'bg-rose-600 text-white shadow-xs' 
                          : (isClean ? 'bg-slate-200 text-slate-600' : 'bg-slate-800 text-slate-400')
                      }`}>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className={`text-xs font-bold truncate ${
                            isCurrent 
                              ? (isClean ? 'text-indigo-950' : 'text-white') 
                              : (isClean ? 'text-slate-800' : 'text-slate-300')
                          }`}>
                            {video.title}
                          </h4>
                          {isCustom && (
                            <span className="text-[9px] font-bold uppercase px-1 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                              Meu Vídeo
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px]">
                          <span className={isClean ? 'text-slate-500' : 'text-slate-400'}>{video.channel}</span>
                          <span className={isClean ? 'text-slate-300' : 'text-slate-600'}>·</span>
                          <span className={`font-mono ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>{video.duration}</span>
                        </div>
                      </div>
                    </div>

                    {isCustom && (
                      <button
                        onClick={(e) => handleDeleteCustomVideo(video.id, e)}
                        className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                        title="Remover vídeo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
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
                      onClick={() => handleJumpToTimestamp(chapter.seconds)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all border ${
                        isCurrentTime
                          ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold shadow-xs dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
                          : (isClean 
                              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700' 
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
                          ? 'bg-rose-600 text-white'
                          : (isClean ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-400')
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
              ? 'bg-amber-50/70 border-amber-200 text-amber-950' 
              : 'bg-amber-950/30 border-amber-900/40 text-amber-200'
          }`}>
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Dica de Aplicação Prática:</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Assista à aula recomendada com o simulador interativo correspondente aberto (DAX, SQL ou Python) para testar os mesmos scripts em tempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
