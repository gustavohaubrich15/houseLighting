import React, { useEffect, useState } from 'react';
import styles from './style.module.css'
import { ILightingData } from '../controle/controle';
import { ReactComponent as Light } from '../../assets/light.svg';

interface ICasa {
    data: ILightingData | undefined
}


export const Casa: React.FC<ICasa> = ({ data }) => {


    return (
        <>
            <div className={styles.containerHouse}>
                <div className={styles.house} >
                    {data?.lampQuarto && <Light height={100} width={60} className={styles.lightBedroomSuper}/>}
                    {data?.lampCozinha && <Light height={100} width={60} className={styles.lightKitchen}  />}
                    {data?.lampSala && <div className={styles.colorLivingRoom} style={{opacity:`${!data.alterarCorSala ?'0':'0.4'}`, backgroundColor:`${data.corLampSala}`}} ></div>}
                    {data?.lampSala && <Light height={100} width={60} className={styles.lightLivingRoom} style={{opacity:`${data.opacidadeLampSala}%`}}/>}
                    {data?.lampBanheiro && <Light height={100} width={60} className={styles.lightBathroom}/>}
                    {data?.lampQuartoHospede && <Light height={100} width={60} className={styles.lightBedroom}/>}
                </div>
            </div>
        </>
    );
}