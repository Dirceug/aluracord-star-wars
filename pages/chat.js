import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

const username = 'Dirceug'

export default function ChatPage() {

    
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    //    *******Usuário******
    // Usuário digita no campo textArea
    // Aperta enter para enviar
    // Tem que adicionar o texto na listagem
    //

    //     ********Dev********
    // [x] Campo Criado
    // [x] Vamos usar o useState(ter if para caso seja enter para limpar a variável)
    // [x] Lista de mensagem

    // ./Sua lógica vai aqui

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaDeMensagens.length + 1,
            de: 'Dirceug',
            texto: novaMensagem,
        }
        // Chamada de um backend
        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens,
        ])
        setMensagem('');
    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                //backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://www.pixel4k.com/wp-content/uploads/2021/03/the-mandalorian-season-2-tv-series-4k_1615198680.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['00']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 12px 15px 0 rgb(0 0 0 / 50%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                    height: '90%',
                    maxWidth: '85%',
                    maxHeight: '95vh',
                    padding: '20px',
                    //position: 'absolute',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[100],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens}/>               
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault()
                                    handleNovaMensagem(mensagem);
                                }                 
                            }}
                            placeholder="Sua mensagem insira aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                            
                        />
                        <Button 
                        styleSheet={{
                            flex: 1,
                            height: '50%',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                            
                        }}
                    //variant='tertiary'
                        colorVariant='neutral'
                        label='OK'
                        onSubmit={function (infosDoEvento){
                            infosDoEvento.preventDefault();
                            console.log("Alguem submeteu o formulário")
                            roteamento.push(`/chat`)
                          }}
                />
                        
                    </Box>
                    
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Text
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["900"],
                marginBottom: '16px',
            }}
            >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                    key={mensagem.id}
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '6px',
                        marginBottom: '12px',
                        hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }
                    }}
                    >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`https://github.com/dirceug.png`}
                        />
                        <Text tag="strong">
                            {mensagem.de}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: appConfig.theme.colors.neutrals[600],
                            }}
                            tag="span"
                        >
                            {(new Date().toLocaleDateString())}
                        </Text>)
            
                    </Box>
                        {mensagem.texto}
                </Text>
                );
            })}
        </Text>
    )
}