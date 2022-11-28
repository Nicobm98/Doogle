import React from "react";
import { Link } from 'react-router-dom';
import s from './landing.module.css';
import logo from '../../images/logo.png'
import linktree from '../../images/linktree.svg'
//import github from '../../images/github.svg'

export default function LandingPage() {
  return (
    <div className={s.containerland}>
      <div className={s.content}>
        <div className={s.logo}>
          <img src={logo} alt="" />
          <div className={s.title}>
            <p>
              Welcome to the most complete dog´s page!
            </p>
          </div>
        </div>
        <div className={s.buttons}>
          <div className={s.linkbut}>
          <Link to='/home'>
            <button data-hover="Let´s go!" className="enter-button">
              <p> ¿Are you ready? </p>
            </button>
          </Link>
          </div>
          {/* <div className="github-button">
        <a  href="https://github.com" target="_blank" rel="noopener noreferrer">
          <img src={github} alt=""/>
        </a>
        </div> */}
          <div className={s.imagenlinktree}>
            <a href="https://linktr.ee/nicobm98" target="_blank"  rel="noreferrer">
              <img src={linktree} alt="" className={s.linktree}></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}