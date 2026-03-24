/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI, Type } from "@google/genai";
import { 
  Rocket, 
  Palette, 
  Type as TypeIcon, 
  Layout as LayoutIcon, 
  ArrowRight, 
  Github, 
  Instagram, 
  Linkedin,
  Sparkles,
  Loader2,
  CheckCircle2,
  Copy,
  ExternalLink,
  Monitor,
  Smartphone,
  MousePointer2,
  Bell,
  Menu,
  X
} from "lucide-react";

// Configuração do Schema para resposta estruturada
const styleGuideSchema = {
  type: Type.OBJECT,
  properties: {
    toneOfVoice: {
      type: Type.OBJECT,
      properties: {
        description: { type: Type.STRING },
        keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["description", "keywords"]
    },
    colorPalette: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          hex: { type: Type.STRING },
          name: { type: Type.STRING },
          usage: { type: Type.STRING }
        },
        required: ["hex", "name", "usage"]
      }
    },
    typography: {
      type: Type.OBJECT,
      properties: {
        heading: { type: Type.STRING },
        body: { type: Type.STRING },
        googleFontsUrl: { type: Type.STRING }
      },
      required: ["heading", "body", "googleFontsUrl"]
    },
    layout: {
      type: Type.OBJECT,
      properties: {
        style: { type: Type.STRING },
        header: { type: Type.STRING },
        buttons: { type: Type.STRING }
      },
      required: ["style", "header", "buttons"]
    },
    ideas: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ["toneOfVoice", "colorPalette", "typography", "layout", "ideas"]
};

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [previewNotification, setPreviewNotification] = useState<string | null>(null);

  // Efeito para carregar as fontes dinamicamente
  useEffect(() => {
    if (result?.typography?.googleFontsUrl) {
      const link = document.createElement("link");
      link.href = result.typography.googleFontsUrl;
      link.rel = "stylesheet";
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [result]);

  const generateStyleGuide = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Gere um guia de estilo completo para o seguinte projeto: "${prompt}". 
        O guia deve incluir Tom de Voz (amigável e profissional), Paleta de Cores (use tons que façam sentido, mas tente incluir variações inspiradas em #2155a3, #4321a3, #2183a3, #a32132 se apropriado), Tipografia do Google Fonts, Estilo de Componentes e Layout.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: styleGuideSchema,
          systemInstruction: "Você é um especialista em design e comunicação digital. Gere guias de estilo criativos e profissionais em Português."
        }
      });

      const data = JSON.parse(response.text);
      setResult(data);
      
      setTimeout(() => {
        document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao gerar o guia. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setPreviewNotification(msg);
    setTimeout(() => setPreviewNotification(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* HEADER */}
      <header className="glass-header">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-magenta rounded-lg flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="text-2xl font-extrabold tracking-tighter text-brand-blue-dark">
              CREATIVE<span className="text-brand-purple">TECH</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-semibold text-brand-blue-dark/80">
            <a href="#gerador" className="hover:text-brand-magenta transition-colors">Gerador</a>
            <a href="#sobre" className="hover:text-brand-magenta transition-colors">Como Funciona</a>
          </nav>

          <button className="btn-primary text-sm px-6 py-2">
            Login
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* HERO & GENERATOR */}
        <section id="gerador" className="relative py-20 overflow-hidden bg-brand-blue-dark text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4321a3,transparent_70%)]"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Dê vida à sua <span className="text-brand-blue-light">Ideia</span> com IA.
              </h1>
              <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
                Descreva seu negócio ou projeto abaixo e nossa inteligência artificial criará um Guia de Estilo completo em segundos com preview interativo.
              </p>

              <div className="relative max-w-2xl mx-auto">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Uma cafeteria moderna e aconchegante para nômades digitais..."
                  className="w-full p-6 pr-16 rounded-3xl bg-white/10 border-2 border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-magenta transition-all resize-none h-32 text-lg"
                />
                <button 
                  onClick={generateStyleGuide}
                  disabled={loading || !prompt}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-brand-magenta rounded-2xl flex items-center justify-center hover:scale-110 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                </button>
              </div>
              {error && <p className="mt-4 text-red-400 font-medium">{error}</p>}
            </motion.div>
          </div>
        </section>

        {/* RESULT SECTION */}
        <AnimatePresence>
          {result && (
            <motion.section 
              id="resultado"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-24 bg-white"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12 border-b pb-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-brand-blue-dark">Seu Guia de Estilo</h2>
                    <p className="text-slate-500">Gerado sob medida para: <span className="italic">"{prompt}"</span></p>
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-2 text-brand-purple font-bold hover:underline"
                  >
                    <Copy size={18} /> Exportar PDF
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                  {/* COLUNA 1: TOM E CORES */}
                  <div className="space-y-8">
                    <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 mb-6">
                        <Rocket className="text-brand-magenta" />
                        <h3 className="text-xl font-bold">Tom de Voz</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-6">{result.toneOfVoice.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {result.toneOfVoice.keywords.map((kw: string) => (
                          <span key={kw} className="px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-blue-dark border border-slate-200">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 mb-6">
                        <Palette className="text-brand-purple" />
                        <h3 className="text-xl font-bold">Paleta de Cores</h3>
                      </div>
                      <div className="space-y-4">
                        {result.colorPalette.map((color: any) => (
                          <div key={color.hex} className="flex items-center gap-4">
                            <div 
                              className="w-12 h-12 rounded-2xl shadow-inner border border-black/5" 
                              style={{ backgroundColor: color.hex }}
                            ></div>
                            <div>
                              <p className="font-bold text-sm">{color.name}</p>
                              <p className="text-xs text-slate-400 uppercase">{color.hex}</p>
                              <p className="text-[10px] text-slate-500 mt-1">{color.usage}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* COLUNA 2: TIPOGRAFIA E LAYOUT */}
                  <div className="space-y-8">
                    <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 mb-6">
                        <TypeIcon className="text-brand-blue-light" />
                        <h3 className="text-xl font-bold">Tipografia</h3>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Títulos</p>
                          <p className="text-2xl font-bold" style={{ fontFamily: result.typography.heading }}>
                            {result.typography.heading}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Corpo</p>
                          <p className="text-base" style={{ fontFamily: result.typography.body }}>
                            {result.typography.body}
                          </p>
                        </div>
                        <a 
                          href={result.typography.googleFontsUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-brand-blue-dark text-sm font-bold hover:underline"
                        >
                          Ver no Google Fonts <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>

                    <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 mb-6">
                        <LayoutIcon className="text-brand-magenta" />
                        <h3 className="text-xl font-bold">Layout & Componentes</h3>
                      </div>
                      <div className="space-y-4 text-sm text-slate-600">
                        <div className="flex gap-3">
                          <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                          <p><strong>Estilo:</strong> {result.layout.style}</p>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                          <p><strong>Header:</strong> {result.layout.header}</p>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                          <p><strong>Botões:</strong> {result.layout.buttons}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* COLUNA 3: IDEIAS */}
                  <div className="space-y-8">
                    <div className="p-8 rounded-[32px] bg-gradient-to-br from-brand-blue-dark to-brand-purple text-white">
                      <div className="flex items-center gap-3 mb-6">
                        <Sparkles className="text-brand-blue-light" />
                        <h3 className="text-xl font-bold">Ideias Criativas</h3>
                      </div>
                      <ul className="space-y-4">
                        {result.ideas.map((idea: string, idx: number) => (
                          <li key={idx} className="flex gap-3 text-sm leading-relaxed">
                            <span className="text-brand-blue-light font-bold">{idx + 1}.</span>
                            {idea}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* INTERACTIVE LIVE PREVIEW SECTION */}
                <div className="mt-16">
                  <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <h3 className="text-2xl font-extrabold text-brand-blue-dark flex items-center gap-2">
                      <Monitor className="text-brand-purple" /> Preview Interativo
                    </h3>
                    <div className="flex bg-slate-100 p-1 rounded-2xl">
                      <button 
                        onClick={() => setViewMode("desktop")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === "desktop" ? "bg-white shadow-sm text-brand-purple" : "text-slate-400"}`}
                      >
                        <Monitor size={14} /> Desktop
                      </button>
                      <button 
                        onClick={() => setViewMode("mobile")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === "mobile" ? "bg-white shadow-sm text-brand-purple" : "text-slate-400"}`}
                      >
                        <Smartphone size={14} /> Mobile
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <motion.div 
                      animate={{ width: viewMode === "desktop" ? "100%" : "375px" }}
                      className="bg-slate-900 rounded-[40px] p-2 md:p-4 shadow-2xl overflow-hidden transition-all duration-500"
                    >
                      {/* Browser Chrome */}
                      <div className="bg-slate-800 rounded-t-3xl p-3 flex items-center gap-2 mb-0 border-b border-slate-700">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mx-auto bg-slate-700 rounded-lg px-4 py-1 text-[10px] text-slate-400 w-1/2 text-center truncate">
                          www.seusite.com.br
                        </div>
                      </div>

                      {/* Site Content Simulation */}
                      <div 
                        className="bg-white min-h-[600px] rounded-b-3xl overflow-y-auto overflow-x-hidden relative scrollbar-hide"
                        style={{ 
                          fontFamily: result.typography.body,
                          backgroundColor: result.colorPalette.find((c: any) => c.usage.toLowerCase().includes('fundo') || c.usage.toLowerCase().includes('background'))?.hex || '#ffffff'
                        }}
                      >
                        {/* Notification Inside Preview */}
                        <AnimatePresence>
                          {previewNotification && (
                            <motion.div 
                              initial={{ y: -50, opacity: 0 }}
                              animate={{ y: 20, opacity: 1 }}
                              exit={{ y: -50, opacity: 0 }}
                              className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 shadow-2xl"
                            >
                              <Bell size={12} className="text-brand-magenta" />
                              {previewNotification}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Mock Header */}
                        <header 
                          className="p-6 flex justify-between items-center sticky top-0 bg-inherit z-40"
                          style={{ borderBottom: `1px solid ${result.colorPalette[0].hex}20` }}
                        >
                          <div 
                            className="font-bold text-xl cursor-pointer hover:opacity-70 transition-opacity" 
                            style={{ fontFamily: result.typography.heading, color: result.colorPalette[0].hex }}
                            onClick={() => showNotification("Navegando para Home")}
                          >
                            LOGO
                          </div>
                          
                          {viewMode === "desktop" ? (
                            <nav className="flex gap-6 text-xs font-semibold opacity-70">
                              {["Home", "Serviços", "Sobre", "Contato"].map(item => (
                                <span 
                                  key={item} 
                                  className="cursor-pointer hover:text-brand-magenta transition-colors"
                                  onClick={() => showNotification(`Abrindo ${item}`)}
                                >
                                  {item}
                                </span>
                              ))}
                            </nav>
                          ) : (
                            <Menu size={20} className="opacity-70" onClick={() => showNotification("Menu Mobile Aberto")} />
                          )}

                          <button 
                            className="px-5 py-2 rounded-full text-[10px] font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-all"
                            style={{ backgroundColor: result.colorPalette.find((c: any) => c.usage.toLowerCase().includes('ação') || c.usage.toLowerCase().includes('cta') || c.usage.toLowerCase().includes('botão'))?.hex || result.colorPalette[0].hex }}
                            onClick={() => showNotification("Botão de Ação Clicado!")}
                          >
                            Ação
                          </button>
                        </header>

                        {/* Mock Hero */}
                        <div className={`p-8 md:p-16 text-center ${viewMode === "mobile" ? "pt-12" : "pt-20"}`}>
                          <motion.h4 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
                            style={{ fontFamily: result.typography.heading, color: result.colorPalette[0].hex }}
                          >
                            {prompt.split(' ').slice(0, 6).join(' ')}
                          </motion.h4>
                          <p className="text-sm md:text-base opacity-70 max-w-md mx-auto mb-10 leading-relaxed">
                            {result.toneOfVoice.description.split('.').slice(0, 2).join('. ')}.
                          </p>
                          <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button 
                              className="px-10 py-4 rounded-full text-xs font-bold text-white shadow-xl hover:brightness-110 active:scale-95 transition-all"
                              style={{ backgroundColor: result.colorPalette.find((c: any) => c.usage.toLowerCase().includes('ação') || c.usage.toLowerCase().includes('cta'))?.hex || result.colorPalette[0].hex }}
                              onClick={() => showNotification("Iniciando Jornada...")}
                            >
                              Começar Agora
                            </button>
                            <button 
                              className="px-10 py-4 rounded-full text-xs font-bold border-2 hover:bg-slate-50 active:scale-95 transition-all"
                              style={{ borderColor: result.colorPalette[0].hex, color: result.colorPalette[0].hex }}
                              onClick={() => showNotification("Mais informações solicitadas")}
                            >
                              Saiba Mais
                            </button>
                          </div>
                        </div>

                        {/* Mock Features Section */}
                        <div className={`grid ${viewMode === "desktop" ? "grid-cols-3" : "grid-cols-1"} gap-6 px-8 md:px-16 pb-16`}>
                          {[1, 2, 3].map(i => (
                            <motion.div 
                              key={i} 
                              whileHover={{ y: -5 }}
                              className="p-6 rounded-[32px] border bg-white/50 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all"
                              style={{ borderColor: `${result.colorPalette[0].hex}20` }}
                              onClick={() => showNotification(`Feature ${i} selecionada`)}
                            >
                              <div 
                                className="w-10 h-10 rounded-2xl mb-4 flex items-center justify-center text-white"
                                style={{ backgroundColor: result.colorPalette[i % result.colorPalette.length].hex }}
                              >
                                {i === 1 ? <Rocket size={18} /> : i === 2 ? <Palette size={18} /> : <Sparkles size={18} />}
                              </div>
                              <h5 className="font-bold mb-2" style={{ color: result.colorPalette[0].hex }}>Funcionalidade {i}</h5>
                              <div className="h-2 w-full bg-slate-200 rounded-full mb-2"></div>
                              <div className="h-2 w-2/3 bg-slate-100 rounded-full"></div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Floating Cursor Mock */}
                        <div className="absolute bottom-10 right-10 flex items-center gap-2 bg-white/90 backdrop-blur-md shadow-2xl p-3 rounded-2xl border border-slate-200 animate-bounce z-50">
                          <MousePointer2 size={16} className="text-brand-magenta" />
                          <span className="text-[10px] font-bold text-slate-600">Clique para Interagir</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* HOW IT WORKS */}
        {!result && (
          <section id="sobre" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-extrabold text-brand-blue-dark mb-16">Como funciona o Gerador?</h2>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-brand-magenta/10 rounded-2xl flex items-center justify-center text-brand-magenta mx-auto text-2xl font-bold">1</div>
                  <h4 className="font-bold">Descreva sua Ideia</h4>
                  <p className="text-slate-500 text-sm">Conte-nos sobre seu negócio, público-alvo e o sentimento que deseja passar.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple mx-auto text-2xl font-bold">2</div>
                  <h4 className="font-bold">IA Processa o Design</h4>
                  <p className="text-slate-500 text-sm">Nossa IA analisa tendências de design e psicologia das cores para criar o guia.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-brand-blue-light/10 rounded-2xl flex items-center justify-center text-brand-blue-light mx-auto text-2xl font-bold">3</div>
                  <h4 className="font-bold">Receba seu Guia</h4>
                  <p className="text-slate-500 text-sm">Pronto! Você recebe cores, fontes e dicas estruturais para começar seu site.</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-magenta rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  C
                </div>
                <span className="text-xl font-extrabold tracking-tighter">
                  CREATIVE<span className="text-brand-blue-light">TECH</span>
                </span>
              </div>
              <p className="text-blue-100 max-w-sm leading-relaxed">
                Especialistas em design e comunicação digital. Criamos pontes entre marcas e pessoas através de experiências incríveis.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Links Rápidos</h4>
              <ul className="space-y-4 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-magenta transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-magenta transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-magenta transition-all">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-blue-300 text-sm">
            &copy; {new Date().getFullYear()} CreativeTech. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
