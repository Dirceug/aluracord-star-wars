import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router'
import appConfig from '../config.json';




function Titulo (props) {
    //console.log (props.children)
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals[100]};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}
            </style>
        </>
    );
}

export default function PaginaInicial() {
  //const username = 'Dirceug';
  const [username, setUsername] = React.useState('Dirceug')
  //console.log('stateDo React', stateDoReact);
  const roteamento = useRouter();

  console.log(roteamento)

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          //backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://www.pixel4k.com/wp-content/uploads/2021/03/the-mandalorian-season-2-tv-series-4k_1615198680.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
        >    
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '600px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 50%)',
            backgroundColor: appConfig.theme.colors.neutrals[900],
            //backgroundColor: '#151525',
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento){
              infosDoEvento.preventDefault();
              console.log("Alguem submeteu o formulário")
              roteamento.push(`/chat`)
              //window.location.href = '/chat'

            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '1000%', sm: '50%' }, textAlign: 'center', marginBottom: '32px', 
            }}
          >
            <Titulo tag="h2">Lutar pelo lado certo da força você deve!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[200] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function Handler (event) {
                console.log("usuário digitou", event.target.value)
                //Onde está o valor?
                const valor = event.target.value;
                //Trocar o valor da variável
                //através do React
                setUsername(valor)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[100],
                  mainColor: appConfig.theme.colors.neutrals[800],
                  mainColorHighlight: appConfig.theme.colors.primary[400],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}

            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals[100],
                mainColor: appConfig.theme.colors.neutrals[700],
                mainColorHightLight: appConfig.theme.colors.neutrals[100],
                mainColorStrong: appConfig.theme.colors.neutrals[800],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[100],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '5px 15px',
                borderRadius: '100px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

//Componente React
//function HomePage() {
    //JSX
//    return (
//        <div>
//        <GlobalStyle />
//        <Titulo tag="h1">Boas vindas de volta!</Titulo>
//        <h2>Discord - Aluramatrix</h2>
//        </div>

//    )
//  }
  