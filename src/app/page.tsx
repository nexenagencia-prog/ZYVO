'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {
  Aperture,
  ArrowRight,
  Bell,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  FileText,
  Grid2X2,
  Layers3,
  Menu,
  Mic2,
  Play,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Video,
  VideoIcon,
} from 'lucide-react';
import styles from './home-reference.module.css';

const menuItems = [
  {label:'Início', href:'/', icon:Grid2X2},
  {label:'Criar reunião', href:'/reuniao-instantanea', icon:VideoIcon},
  {label:'Agenda', href:'/agenda', icon:CalendarDays},
  {label:'Performance', href:'/skills', icon:Sparkles},
  {label:'Contatos', href:'/contatos', icon:CircleUserRound},
  {label:'Notificações', href:'/configuracoes', icon:Bell},
  {label:'Configurações', href:'/configuracoes', icon:Settings},
];

const quickLinks = [
  {label:'Minhas\nanotações', href:'/minhas-anotacoes', icon:FileText},
  {label:'Criar slides', href:'/criar-slides', icon:Video},
  {label:'Gravações\nrecentes', href:'/gravacoes', icon:Play},
  {label:'Criar\nreunião', href:'/reuniao-instantanea', icon:Camera},
];

const featureCards = [
  {title:'Leve &\nportátil', text:'Compacto e resistente\npara qualquer cenário.', icon:Mic2, art:'feather'},
  {title:'Otimização\nde vídeo', text:'Imagens mais nítidas\ncom menos esforço.', icon:VideoIcon, art:'lens'},
  {title:'Abertura\nlinear', text:'Controle preciso\nde luz para cada\ndetalhe.', icon:Aperture, art:'aperture'},
  {title:'Revestimento\nmulticamadas', text:'Menos reflexos,\nmais fidelidade\nde cor.', icon:Layers3, art:'purple'},
  {title:'Autofoco rápido\ne silencioso', text:'Precisão instantânea\ncom operação\nultrassilenciosa.', icon:SlidersHorizontal, art:'focus'},
  {title:'Retratos com\nexcelência', text:'Tecnologia que valoriza\ncada expressão\ne detalhe.', icon:CircleUserRound, art:'portrait'},
];

export default function HomePage(){
  const router = useRouter();
  const [expanded,setExpanded] = useState(false);
  const [q,setQ] = useState('');

  const toggleMenu = ()=>setExpanded(v=>!v);

  const submit = (e:React.FormEvent)=>{
    e.preventDefault();
    if(q.trim()) router.push(`/reunioes?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <main className={styles.page}>
      <aside className={`${styles.sidebar} ${expanded ? styles.sidebarExpanded : ''}`}>
        <button type="button" className={styles.expandToggle} onClick={toggleMenu} aria-label={expanded?'Recolher menu':'Expandir menu'} aria-expanded={expanded}>
          {expanded?<ChevronLeft size={16}/>:<ChevronRight size={16}/>} 
        </button>
        <Link href="/profile" className={styles.avatar} aria-label="Perfil">
          <span className={styles.avatarFace}>S</span>
        </Link>
        <nav className={styles.sideNav}>
          {menuItems.map(({label,href,icon:Icon},i)=>(
            <Link key={label} href={href} className={`${styles.sideItem} ${i===1?styles.primarySide:''}`} title={label}>
              <Icon size={22} strokeWidth={1.55}/><span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sideBottom}>
          <button type="button" className={styles.sideItem} onClick={toggleMenu} aria-label={expanded?'Recolher menu lateral':'Expandir menu lateral'} aria-expanded={expanded} title={expanded?'Recolher menu':'Expandir menu'}>
            <Menu size={22} strokeWidth={1.55}/><span>{expanded?'Recolher menu':'Expandir menu'}</span>
          </button>
        </div>
      </aside>

      <section className={styles.canvas}>
        <header className={styles.topbar}>
          <Link href="/" className={styles.brand}>ZYVO</Link>
          <form className={styles.search} onSubmit={submit}>
            <Search size={17} strokeWidth={1.5}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar reuniões, pessoas ou gravações"/>
          </form>
          <nav className={styles.topnav}>
            <Link href="/reunioes">Recursos</Link>
            <Link href="/skills">Tecnologia</Link>
            <Link href="/skills">Performance</Link>
            <Link href="/profile">Sobre nós</Link>
          </nav>
          <Link href="/login" className={styles.access}>Acessar <ArrowRight size={17}/></Link>
        </header>

        <section className={styles.heroArea}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>TECNOLOGIA QUE TRANSFORMA</p>
            <h1>Reuniões com<br/><span>Performance Pro</span></h1>
            <p className={styles.subcopy}>Ferramentas inteligentes para reuniões mais<br/>produtivas, análises precisas e resultados<br/>que fazem a diferença.</p>
            <div className={styles.heroActions}>
              <Link href="/reuniao-instantanea" className={styles.createButton}><VideoIcon size={18}/>Criar reunião<span>+</span></Link>
              <Link href="/gravacoes" className={styles.watchButton}><span><Play size={14} fill="currentColor"/></span>Assistir gravação</Link>
            </div>
            <div className={styles.quickRow}>
              {quickLinks.map(({label,href,icon:Icon})=>(
                <Link key={label} href={href} className={styles.quickItem}>
                  <Icon size={28} strokeWidth={1.35}/>
                  <span>{label.split('\n').map((line,idx)=><span key={idx}>{line}</span>)}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.cardGrid}>
            {featureCards.map(({title,text,icon:Icon,art})=>(
              <article key={title} className={`${styles.featureCard} ${styles[`art_${art}`]}`}>
                <Icon className={styles.cardIcon} size={31} strokeWidth={1.25}/>
                <h2>{title.split('\n').map((line,idx)=><span key={idx}>{line}</span>)}</h2>
                <div className={styles.cardRule}/>
                <p>{text.split('\n').map((line,idx)=><span key={idx}>{line}</span>)}</p>
                <div className={styles.artShape}/>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
