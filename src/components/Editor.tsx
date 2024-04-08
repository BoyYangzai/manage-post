//@ts-nocheck
'use client'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Alert, Button, Card, Input } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import { Message } from '@mui/icons-material'
function MyEditor({ setPosts }) {
  const[alert, setAlert] = useState(false)
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  const [title, setTitle] = useState('')
    const [html, setHtml] = useState('')


    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法
    // const toolbarConfig = { }                        // JS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

  return (
    <div style={{
      marginTop: '20px',
    }}>
      {
        alert && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Post successfully!
</Alert>
      }
      <Input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          setAlert(false)
        }}
        placeholder='Input post title'
        style={{
          width: '100%',
          marginTop: '20px',
          border: '0.2px solid #ccc',
          padding: '10px',
          textDecoration: 'none',
     }}></Input>
      <Card sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
      }}>
        <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
          onChange={editor => {
            setHtml(editor.getHtml())
            setAlert(false)}}
          mode="default"
          style={{
            width: '100%',
            height: '300px',
          }}
                />
      </Card>
      <Button
        onClick={() => {
          setPosts((posts) => {
            return [
              ...posts,
              {
                title: title,
                content: html,
              }
            ]
          })
          setAlert(true)
          setTitle('')
          setHtml('')
        }}
        sx={{
        marginTop: '20px',
        width: '40%',
        backgroundColor: '#532BC5',
        color: 'white',
      }}>
        <CheckIcon></CheckIcon>
        Post</Button>
    </div>
    

    )
}

export default MyEditor
