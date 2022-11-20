import { useEffect } from 'react'
import logo from '../../assets/logo.png'
import styles from './Home.module.css'
import matchServices from '../../providers/http-services/match'

function Home() {

    // useEffect(() => {
    //     matchServices.allMatches()
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // }, [])

    return (
        <div className={styles.home_container}>
            <h1>Bem-vindo ao <span>CopaInfo 2022</span></h1>
            <p>Aplicação para acompanhamento e visualização de informações da FIFA World Cup Qatar 2022</p>
            <img src={logo} alt='Qatar world cup logo' />
        </div>
    )
}

export default Home