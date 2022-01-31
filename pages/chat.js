import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const username = 'Dirceug'


const SUPABASE_ANNON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ4NzExNSwiZXhwIjoxOTU5MDYzMTE1fQ.cYQSGbml-EsxhuBXTsLx67_I_esXRuHJfA3wvkcf7tE';
const SUPABASE_URL = 'https://zfocumnxaemvuresfyyw.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANNON_KEY);






export default function ChatPage() {

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([
    ]);

    function escutaMensagensEmTempoReal (adicionaMensagem) {
        return supabaseClient
        .from('mensagem')
        .on(`INSERT`, ({ respotstaLive }) => {
            adicionaMensagem(respotstaLive.new);
        })
        .subscribe();
    }

    React.useEffect(() => {
        supabaseClient
            .from(`mensagens`)
            .select(`*`)
            .order('id', {ascending: false})
            .then(({ data }) => {
            console.log('Dados da consulta:', data);
            setListaDeMensagens(data);
        });

        escutaMensagensEmTempoReal((novaMensagem) => {
            //handleNovaMensagem(novaMensagem)
                            //console.log('Criando Mensagem: ', oQueTaVindoComoResposta)
            setListaDeMensagens([
                data[0],
                ...listaDeMensagens,
                ])
        });
    }, []),


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



    function handleNovaMensagem (novaMensagem) {
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: usuarioLogado ,
            texto: novaMensagem,
        }
        // Chamada de um backend

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
            setMensagem('');
            });

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
                    height: '50%',
                    maxWidth: '50%',
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
                                    event.preventDefault();
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

                          {/**Callback */}
                    <ButtonSendSticker 
                        onStickerClick={(sticker) => {
                            console.log('Salva este sticker no banco', sticker);
                            handleNovaMensagem (':sticker:' + sticker);
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
        <Box
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
                            src={`https://github.com/${mensagem.de}.png`}
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
                   {/*  Condicional: {mensagem.texto.startsWith(':sticker:').toString()}*/}
                    {mensagem.texto.startsWith(':sticker:') ? (
                        <Image src={mensagem.texto.replace(':sticker:', '')}/>
                    )
                    : (
                        mensagem.texto
                    )}
                    {/*
                        if mensagem de texto possui stickers:
                            mostra a mensagem
                        else
                            mensagem.texto
                    */}
                    {/*mensagem.texto*/}
                </Text>
                );
            })}
        </Box>
    )
}