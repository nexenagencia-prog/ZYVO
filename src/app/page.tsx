'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expanded,setExpanded] = useState(false);
  const [q,setQ] = useState('');
  const [userName,setUserName] = useState('Sandro');
  const [avatar,setAvatar] = useState('');

  useEffect(()=>{
    const savedName = window.localStorage.getItem('zyvo-user-name');
    const savedAvatar = window.localStorage.getItem('zyvo-user-avatar');
    if(savedName?.trim()) setUserName(savedName);
    if(savedAvatar) setAvatar(savedAvatar);
  },[]);

  const toggleMenu = ()=>setExpanded(v=>!v);

  const updateName = (value:string)=>{
    setUserName(value);
    if(value.trim()) window.localStorage.setItem('zyvo-user-name',value.trim());
  };

  const chooseAvatar = ()=>fileInputRef.current?.click();

  const uploadAvatar = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if(!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      if(typeof reader.result !== 'string') return;
      setAvatar(reader.result);
      try{ window.localStorage.setItem('zyvo-user-avatar',reader.result); }catch{}
    };
    reader.readAsDataURL(file);
    e.target.value='';
  };

  const submit = (e:React.FormEvent)=>{
    e.preventDefault();
    if(q.trim()) router.push(`/reunioes?q=${encodeURIComponent(q.trim())}`);
  };

  const displayName = userName.trim() || 'Sandro';

  return (
    <main className={styles.page}>
      <aside className={`${styles.sidebar} ${expanded ? styles.sidebarExpanded : ''}`}>
        <button type="button" className={styles.expandToggle} onClick={toggleMenu} aria-label={expanded?'Recolher menu':'Expandir menu'} aria-expanded={expanded}>
          {expanded?<ChevronLeft size={16}/>:<ChevronRight size={16}/>} 
        </button>

        <div className={styles.profileHeader}>
          <button type="button" className={styles.avatar} onClick={chooseAvatar} aria-label="Alterar foto do perfil" title="Alterar foto do perfil">
            <span className={styles.avatarFace} style={avatar?{backgroundImage:`url(${avatar})`}:undefined}>{avatar?'':displayName.charAt(0).toUpperCase()}</span>
          </button>
          <div className={styles.profileEditor}>
            <input className={styles.profileNameInput} value={userName} onChange={e=>updateName(e.target.value)} onBlur={()=>{if(!userName.trim()) updateName('Sandro')}} aria-label="Nome do usuário" />
            <button type="button" className={styles.changePhoto} onClick={chooseAvatar}>Trocar foto</button>
          </div>
          <input ref={fileInputRef} className={styles.hiddenFile} type="file" accept="image/*" onChange={uploadAvatar}/>
        </div>

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
            <Link href="/">Início</Link>
            <Link href="/skills">Skills</Link>
            <Link href="/agenda">Agenda</Link>
            <Link href="/planos">Planos e Preços</Link>
          </nav>
          <Link href="/login" className={styles.access}>Acessar <ArrowRight size={17}/></Link>
        </header>

        <section className={styles.heroArea}>
          <div className={styles.heroCopy}>
            <p className={styles.greeting}>Bem-vindo, <strong>{displayName}</strong></p>
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
                  <Icon size={24} strokeWidth={1.05}/>
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
