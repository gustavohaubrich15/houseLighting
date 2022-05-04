import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styles from './style.module.css'
import users from '../../assets/user.png'
import Switch from "react-switch"
import { HexColorPicker } from "react-colorful";
import { Slider } from '@mui/material';

export interface ILightingData {
  lampCozinha: boolean,
  lampSala: boolean,
  lampQuarto: boolean,
  lampQuartoHospede: boolean,
  lampBanheiro: boolean,
  opacidadeLampSala: number,
  alterarCorSala: boolean,
  corLampSala: string
}

interface IControle {
  changeValues: (data: ILightingData) => void
}

const socket = io('http://localhost:5000')

export const Controle: React.FC<IControle> = ({ changeValues }) => {

  const [usuarioConectados, setUsuariosConectados] = useState<string[]>([])
  const [lampCozinha, setLampCozinha] = useState(false)
  const [lampSala, setLampSala] = useState(false)
  const [lampQuarto, setLampQuarto] = useState(false)
  const [lampQuartoHospede, setLampQuartoHospede] = useState(false)
  const [lampBanheiro, setLampBanheiro] = useState(false)
  const [opacidadeLampSala, setOpacidadeLampSala] = useState<number>(0)
  const [corLampSala, setCorLampSala] = useState("#FFFFFF");
  const [alterarCorSala, setAlterarCorSala] = useState(false)
  const [loadStartValues, setLoadStartValues] = useState<boolean>(false)

  const setStateValues = (data: ILightingData) =>{
      setLampCozinha(data.lampCozinha)
      setLampSala(data.lampSala)
      setLampQuarto(data.lampQuarto)
      setLampQuartoHospede(data.lampQuartoHospede)
      setLampBanheiro(data.lampBanheiro)
      setOpacidadeLampSala(data.opacidadeLampSala)
      setAlterarCorSala(data.alterarCorSala)
      setCorLampSala(data.corLampSala)
  }


  useEffect(() => {
    socket.on('onlineUsers', (usuarios: string[]) => {
      setUsuariosConectados(usuarios)
    })
    socket.on('startLightingValues', (data: ILightingData) => {
      setStateValues(data)
      setLoadStartValues(true)
    })
    socket.on('changeLightingValues', (data: ILightingData) => {
      setStateValues(data)
    })
  }, [])



  useEffect(() => {
    loadStartValues && socket.emit('changeLightingValuesClient', {
      lampCozinha,
      lampSala,
      lampQuarto,
      lampQuartoHospede,
      lampBanheiro,
      opacidadeLampSala,
      alterarCorSala,
      corLampSala
    })
  }, [lampCozinha, lampSala, lampQuarto, lampQuartoHospede, lampBanheiro, alterarCorSala])


  useEffect(() => {
    changeValues({ lampCozinha, lampSala, lampQuarto, lampQuartoHospede, lampBanheiro, opacidadeLampSala, alterarCorSala, corLampSala })
  }, [lampCozinha, lampSala, lampQuarto, opacidadeLampSala, corLampSala, lampBanheiro, lampQuartoHospede, alterarCorSala, changeValues])


  return (
    <>
      <div className={styles.phone}>
        <div className={styles.containerUser}>
          <img src={users} className={styles.users} alt="usuarioImage"></img>
          {`Usuários conectados : ${usuarioConectados.length}`}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}> Iluminação - Lampadas </div>
        <div className={styles.containerLampGeral}>
          <div className={styles.containerLampEspec}>
            <div style={{ paddingBottom: 10 }}>Quarto</div>
            <Switch height={25} width={70} onColor="#86c128" checkedIcon={false} uncheckedIcon={false} onChange={setLampQuarto} checked={lampQuarto} />
          </div>
          <div className={styles.containerLampEspec}>
            <div style={{ paddingBottom: 10 }}>Sala</div>
            <Switch height={25} width={70} onColor="#86c128" checkedIcon={false} uncheckedIcon={false} onChange={setLampSala} checked={lampSala} />
          </div>
          <div className={styles.containerLampEspec}>
            <div style={{ paddingBottom: 10 }}>Cozinha</div>
            <Switch height={25} width={70} onColor="#86c128" checkedIcon={false} uncheckedIcon={false} onChange={setLampCozinha} checked={lampCozinha} />
          </div>
          <div className={styles.containerLampEspec}>
            <div style={{ paddingBottom: 10 }}>Quarto Hosp.</div>
            <Switch height={25} width={70} onColor="#86c128" checkedIcon={false} uncheckedIcon={false} onChange={setLampQuartoHospede} checked={lampQuartoHospede} />
          </div>
          <div className={styles.containerLampEspec}>
            <div style={{ paddingBottom: 10 }}>Banheiro</div>
            <Switch height={25} width={70} onColor="#86c128" checkedIcon={false} uncheckedIcon={false} onChange={setLampBanheiro} checked={lampBanheiro} />
          </div>
        </div>

        <div style={{ paddingTop: 20 }}>

          <div>
            <div className='value' style={{ display: 'flex', justifyContent: 'center' }} >Claridade sala: {`${opacidadeLampSala}%`}</div>
            <Slider
              aria-label="Custom marks"
              defaultValue={0}
              value={opacidadeLampSala}
              onChange={(event: any, value: any) => {
                value = Number(value)
                setOpacidadeLampSala(value)
                socket.emit('changeLightingValuesClient', {
                  lampCozinha,
                  lampSala,
                  lampQuarto,
                  lampQuartoHospede,
                  lampBanheiro,
                  opacidadeLampSala,
                  alterarCorSala,
                  corLampSala
                })
              }}
              min={0}
              max={100}
              step={5}
              valueLabelDisplay="off"
              marks={true}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div>Alterar coloração sala: </div>
          <Switch height={15} width={50} onColor="#86c128" checkedIcon={false} uncheckedIcon={false} onChange={setAlterarCorSala} checked={alterarCorSala} /></div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
          <HexColorPicker color={corLampSala} onChange={(value: string) => {
            loadStartValues && setCorLampSala(value)
            loadStartValues && socket.emit('changeLightingValuesClient', {
              lampCozinha,
              lampSala,
              lampQuarto,
              lampQuartoHospede,
              lampBanheiro,
              opacidadeLampSala,
              alterarCorSala,
              corLampSala
            })
          }}

            style={{ height: 80 }} />
        </div>


      </div>
    </>
  );
}