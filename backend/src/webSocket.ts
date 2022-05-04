import {io} from './http'


interface ILightingData{
    lampCozinha: boolean,
    lampSala: boolean,
    lampQuarto: boolean,
    lampQuartoHospede: boolean,
    lampBanheiro: boolean,
    opacidadeLampSala:number,
    alterarCorSala: boolean,
    corLampSala: string
  }

let usuarioConectados: string[] = []
let data :ILightingData = {
    lampCozinha: false,
    lampSala: false,
    lampQuarto: false,
    lampQuartoHospede: false,
    lampBanheiro: false,
    opacidadeLampSala:0,
    alterarCorSala:false,
    corLampSala: '#FFFFFF'
}


io.on('connection', (socket) =>{
    
    usuarioConectados.push(socket.id)
    io.emit('onlineUsers', usuarioConectados)
    socket.emit('startLightingValues',data)

    socket.on('changeLightingValuesClient',(dataClient: ILightingData)=>{
        console.log(dataClient)
        if(data !== dataClient){
            socket.broadcast.emit('changeLightingValues', dataClient)
            data = dataClient
        }

    })

    socket.on('disconnect',()=>{
        usuarioConectados = usuarioConectados.filter((usuario) => {return usuario !== socket.id})
        io.emit('onlineUsers', usuarioConectados)
    })
})