import React, { useState } from 'react';
import { Casa } from './components/casa/casa';
import { Controle, ILightingData } from './components/controle/controle';
import styles from './style.module.css'

export const App: React.FC = () => {

  const [data, setData] = useState<ILightingData>()

  return (
    <>
      <div className={styles.area}>
        <div className={styles.container}>
          <Controle changeValues={setData}/>
          <Casa data={data}/>
        </div>
      </div>
    </>
  );
}