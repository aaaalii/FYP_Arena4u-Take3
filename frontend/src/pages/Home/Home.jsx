import styles from './Home.module.css';
import { getStadiums } from '../../api/internal';
import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import Hero from '../../components/Hero/Hero';

function Home() {

    return (
        <Hero/>
    );
}

export default Home;