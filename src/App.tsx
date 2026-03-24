/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Rocket, 
  Palette, 
  Type, 
  Layout as LayoutIcon, 
  CheckCircle2, 
  ArrowRight, 
  Github, 
  Instagram, 
  Linkedin,
  Monitor,
  Smartphone,
  Layers
} from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
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
            <a href="#guia" className="hover:text-brand-magenta transition-colors">Guia de Estilo</a>
            <a href="#componentes" className="hover:text-brand-magenta transition-colors">Componentes</a>
            <a href="#preview" className="hover:text-brand-magenta transition-colors">Preview</a>
          </nav>

          <button className="btn-primary text-sm px-6 py-2">
            Começar Agora
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative py-24 overflow-hidden bg-brand-blue-dark text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-purple rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue-light rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                Design que <span className="text-brand-blue-light">Prende</span> a Atenção.
              </h1>
              <p className="text-xl text-blue-100 mb-10 max-w-lg leading-relaxed">
                Transformamos sua visão em uma experiência digital memorável, unindo técnica profissional com uma estética vibrante.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary flex items-center gap-2">
                  Ver Projetos <ArrowRight size={20} />
                </button>
                <button className="px-8 py-3 rounded-full border-2 border-white/30 font-bold hover:bg-white/10 transition-all">
                  Saiba Mais
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
                alt="Equipe Criativa" 
                className="rounded-3xl shadow-2xl border-8 border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl text-brand-blue-dark hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="text-brand-magenta" />
                  <span className="font-bold">Alta Performance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-magenta" />
                  <span className="font-bold">Design Exclusivo</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* GUIA DE ESTILO SECTION */}
        <section id="guia" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-brand-blue-dark mb-4">Guia de Estilo Completo</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">A base sólida para uma comunicação digital coerente e impactante.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* TOM DE VOZ */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-brand-blue-dark/10 rounded-2xl flex items-center justify-center text-brand-blue-dark mb-6">
                  <Rocket size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">1. Tom de Voz</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Amigável e profissional. Uma mistura equilibrada entre proximidade e autoridade técnica.
                </p>
              </div>

              {/* PALETA DE CORES */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple mb-6">
                  <Palette size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">2. Paleta de Cores</h3>
                <div className="flex gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#2155a3]" title="Azul Escuro"></div>
                  <div className="w-8 h-8 rounded-full bg-[#4321a3]" title="Roxo"></div>
                  <div className="w-8 h-8 rounded-full bg-[#2183a3]" title="Azul Claro"></div>
                  <div className="w-8 h-8 rounded-full bg-[#a32132]" title="Magenta"></div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cores vibrantes escolhidas para prender a atenção e guiar o olhar do usuário.
                </p>
              </div>

              {/* TIPOGRAFIA */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-brand-blue-light/10 rounded-2xl flex items-center justify-center text-brand-blue-light mb-6">
                  <Type size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">3. Tipografia</h3>
                <div className="space-y-2">
                  <p className="font-montserrat font-bold text-sm">Montserrat (Títulos)</p>
                  <p className="font-open-sans text-sm">Open Sans (Corpo)</p>
                </div>
              </div>

              {/* LAYOUT */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-brand-magenta/10 rounded-2xl flex items-center justify-center text-brand-magenta mb-6">
                  <LayoutIcon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">4. Layout</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Visual e dinâmico. Uso estratégico de espaços e componentes arredondados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENTES PREVIEW */}
        <section id="componentes" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-extrabold text-brand-blue-dark mb-6">Componentes de Interface</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Nossos componentes são desenhados para serem táteis e intuitivos. O uso de bordas arredondadas e sombras suaves cria uma interface acolhedora.
                </p>
                
                <div className="space-y-8">
                  <div className="flex flex-col gap-4">
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Botões</span>
                    <div className="flex flex-wrap gap-4">
                      <button className="btn-primary">Botão Primário</button>
                      <button className="btn-secondary">Botão Secundário</button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Cards de Serviço</span>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <Layers className="text-brand-purple mb-4" />
                        <h4 className="font-bold mb-2">Desenvolvimento</h4>
                        <p className="text-sm text-slate-500">Sistemas robustos e escaláveis.</p>
                      </div>
                      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <Monitor className="text-brand-blue-light mb-4" />
                        <h4 className="font-bold mb-2">Web Design</h4>
                        <p className="text-sm text-slate-500">Interfaces que convertem.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-brand-blue-dark rounded-[40px] p-8 shadow-2xl aspect-square flex flex-col justify-center items-center text-center text-white">
                  <Smartphone size={80} className="mb-8 text-brand-blue-light" />
                  <h3 className="text-3xl font-bold mb-4">Mobile First</h3>
                  <p className="text-blue-100 max-w-xs">
                    Toda a nossa biblioteca de componentes é otimizada para dispositivos móveis desde o primeiro pixel.
                  </p>
                </div>
                {/* Elementos decorativos */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-magenta rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-purple rounded-full opacity-50 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
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
