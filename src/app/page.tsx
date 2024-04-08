//@ts-nocheck

'use client'
import * as React from 'react';
import { Avatar, Card, Container, Link, PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import getLPTheme from './getLPTheme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Editor } from '@wangeditor/editor-for-react';
import dynamic from 'next/dynamic';
import DeleteIcon from '@mui/icons-material/Delete';
const WangEditor = dynamic(
  () => import('../components/Editor'),
  {ssr: false}
)
interface ToggleCustomThemeProps {
  showCustomTheme: Boolean;
  toggleCustomTheme: () => void;
}

function ToggleCustomTheme({
  showCustomTheme,
  toggleCustomTheme,
}: ToggleCustomThemeProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default function LandingPage() {
  const [currentTab, setCurrentTab] = React.useState(1);
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [posts,setPosts]=React.useState([]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <Container style={{
        width: '60%',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginTop: '20px',
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '10px',
        }}>
       <ArrowBackIcon></ArrowBackIcon> Back
      </div>
        <h2 style={{
          width: '100%',
          textAlign: 'center',
        }}>Manage Post</h2>
        <Card
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            ":hover": {
              cursor: 'pointer',
            }
          }}
          onClick={() => {
            // add new tab to https://www.github.com/boyyangzai
            window.open('https://www.github.com/boyyangzai', '_blank');
          }}
        >
          <Avatar
            sx={{
              width: '100px',
              height: '100px',
              mr:5
            }}
            variant="rounded" alt="yang" src="https://avatars.githubusercontent.com/u/94534613?v=4" />
          <div>
            <div style={{
              color:'#606060'
            }}>yang</div>
            <a
              style={{
                color: '#1F1F2C',
                textDecoration: 'none',
              }}
              href='https://www.github.com/boyyangzai' target='__blank' >https://www.github.com/boyyangzai</a>
          </div>
        </Card>
        <Card
          sx={{
            marginTop: '20px',
            width: '100%',
            height: '45px',
            display: 'flex',
               ':hover': {
                      cursor: 'pointer',
                    },
        }}>
          {
            ['Settings', 'Post'].map((i,index) => {
              return (
                <div
                  onClick={() => {
                    setCurrentTab(index);
                  }
                  }
                  style={{
                  flex: 1,
                    backgroundColor: currentTab === index ? '#532BC5' : '#ffffff',
                  color: currentTab === index ? '#ffffff' : '#000000',
                  display: 'flex',
                  justifyContent: 'center',
                    alignItems: 'center',
                }}>
                  {i}
                  {
                    index === 1 &&
                    <span style={{
                       marginLeft: '5px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: currentTab === index ? '#ffffff' : '#000000',
                        color: currentTab === index ? '#532BC5' : 'white',
                        display: 'flex',

                        justifyContent: 'center', 
                        alignItems: 'center',
                  }}>
                {posts.length}
                  </span>
                 }
                </div>
              )
            })
          }
          
        </Card>
        <WangEditor setPosts={setPosts}></WangEditor>

        {
          posts.map((post,index) => {
            return (

              <div
                key={index}
                style={{
                  marginTop: '40px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent:'center',
                  position: 'relative',
                  overflow: 'none',
                }}>
                <div style={{
                  width: '90%',
                      display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  borderTop: '1px solid #ccc',
                }}>
                  <div style={{
                    position: 'absolute',
                    borderRadius: '30px',
                    top: '-14px',
                    left:'-4px',
                    backgroundColor: '#532BC5',
                    padding: '5px',
                    paddingRight: '20px',
                    paddingLeft: '20px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}> {post.title}</div>
                       <div style={{
                    position: 'absolute',
                    borderRadius: '30px',
                    top: '-14px',
                    right:'20px',
                    backgroundColor: '#532BC5',
                    padding: '5px',
                    paddingRight: '20px',
                    paddingLeft: '20px',
                    color: 'white',
                  }}><BorderColorIcon style={{
                    fontSize: '20px',
                    }}></BorderColorIcon> Edit</div>
                  <div
                    onClick={() => [
                      setPosts((posts) => {
                        return posts.filter((_,i) => i !== index)
                      })
                    ]}
                    style={{
                    width: '35PX',
                    height: '35PX',
                    position: 'absolute',
                    borderRadius: '50%',
                    top: '-14px',
                    right:'-14px',
                    backgroundColor: '#C4C4C4',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                      alignItems: 'center',
                  }}><DeleteIcon
                      style={{
                    fontSize: '20px',
                    }}></DeleteIcon></div>
                  <h3 style={{
                    marginTop: '40px',
                  }}>{post.title}</h3>
                <div dangerouslySetInnerHTML={{__html: post.content}}></div>
                </div>
              </div>
            )
          })
        }
      </Container>
    </ThemeProvider>
  );
}
