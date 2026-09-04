'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {FormEvent, useState} from 'react';
import styles from './home-reference.module.css';

const hotspots = [
  {label:'Início', href:'/', cls:'navHome'},
  {label:'Skills', href:'/skills', cls:'navSkills'},
  {label:'Agenda', href:'/agenda', cls:'navAgenda'},
  {label:'Planos e Preços', href:'/planos', cls:'navPlans'},
  {label:'Acessar', href:'/login', cls:'navAccess'},
  {label:'Criar reunião', href:'/reuniao-instantanea', cls:'createMeeting'},
  {label:'Entrar', href:'/reunioes', cls:'enterMeeting'},
  {label:'Minhas anotações', href:'/minhas-anotacoes', cls:'quickNotes'},
  {label:'Criar slides', href:'/criar-slides', cls:'quickSlides'},
  {label:'Gravações recentes', href:'/gravacoes', cls:'quickRecordings'},
  {label:'Criar reunião', href:'/reuniao-instantanea', cls:'quickMeeting'},
  {label:'Criar reunião', href:'/reuniao-instantanea', cls:'sideMeeting'},
  {label:'Agenda', href:'/agenda', cls:'sideAgenda'},
  {label:'Contatos', href:'/contatos', cls:'sideContacts'},
  {label:'Anotações', href:'/minhas-anotacoes', cls:'sideNotes'},
  {label:'Configurações', href:'/configuracoes', cls:'sideSettings'},
];

export default function HomePage(){
  const router = useRouter();
  const [query,setQuery] = useState('');

  const submitSearch = (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const value = query.trim();
    if(value) router.push(`/reunioes?q=${encodeURIComponent(value)}`);
  };

  return (
    <main className={styles.artPage}>
      <div className={styles.artStage} aria-label="ZYVO — Reuniões com Performance Pro">
        <img
          className={styles.heroArtwork}
          src="/zyvo-hero-final-1920x1080.jpg"
          alt="ZYVO — interface de reuniões com Performance Pro e análise facial"
          width={1920}
          height={1080}
          draggable={false}
        />

        <h1 className={styles.srOnly}>Reuniões com Performance Pro</h1>

        <form className={styles.searchHotspot} onSubmit={submitSearch}>
          <label className={styles.srOnly} htmlFor="zyvo-search">Buscar reuniões, pessoas ou gravações</label>
          <input
            id="zyvo-search"
            value={query}
            onChange={event=>setQuery(event.target.value)}
            aria-label="Buscar reuniões, pessoas ou gravações"
          />
        </form>

        {hotspots.map(item=>(
          <Link
            key={`${item.cls}-${item.href}`}
            href={item.href}
            className={`${styles.hotspot} ${styles[item.cls]}`}
            aria-label={item.label}
            title={item.label}
          >
            <span className={styles.srOnly}>{item.label}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
