import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Portfolio } from './components/Portfolio'

const Home: NextPage = () => {
  return (
    <Portfolio />
  )
}

export default Home
