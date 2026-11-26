import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import './App.css'

type UploadKind = 'garment' | 'model'

type UploadState = {
  file: File | null
  preview: string | null
}

const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Full look']

function UploadCard({
  kind,
  title,
  description,
  upload,
  onFileChange,
}: {
  kind: UploadKind
  title: string
  description: string
  upload: UploadState
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  const isGarment = kind === 'garment'

  return (
    <section className="upload-card">
      <div className="card-heading">
        <div className="step-label">
          <span className="step-number">{isGarment ? '01' : '02'}</span>
          <span>{isGarment ? 'THE PIECE' : 'THE MODEL'}</span>
        </div>
        <span className="required-label">REQUIRED</span>
      </div>

      <label className={`dropzone ${upload.preview ? 'has-image' : ''}`} htmlFor={`${kind}-upload`}>
        <input
          id={`${kind}-upload`}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={onFileChange}
        />
        {upload.preview ? (
          <>
            <img className={`upload-preview ${isGarment ? 'garment-preview' : ''}`} src={upload.preview} alt={title} />
            <span className="change-image">Change image</span>
          </>
        ) : (
          <div className="upload-empty">
            <span className="upload-icon" aria-hidden="true">
              {isGarment ? (
                <svg viewBox="0 0 24 24"><path d="m8.5 4 3.5 2 3.5-2 5 3.2-2.2 4.1-2.1-1.1V21H7.8V10.2l-2.1 1.1L3.5 7.2 8.5 4Z" /><path d="M8.5 4c.3 2.2 1.4 3.4 3.5 3.4S15.2 6.2 15.5 4" /></svg>
              ) : (
                <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2" /><path d="M5.2 20c.5-4 2.7-6 6.8-6s6.3 2 6.8 6" /></svg>
              )}
            </span>
            <strong>Drop your {isGarment ? 'garment' : 'photo'} here</strong>
            <span>or <em>browse files</em></span>
            <small>JPG, PNG or WEBP · Up to 10 MB</small>
          </div>
        )}
      </label>
      <div className="upload-card-footer">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {upload.file && <span className="file-ready" aria-label="Image uploaded">✓</span>}
      </div>
      {upload.file && <p className="file-name" title={upload.file.name}>{upload.file.name}</p>}
    </section>
  )
}

function App() {
  const [garment, setGarment] = useState<UploadState>({ file: null, preview: null })
  const [model, setModel] = useState<UploadState>({ file: null, preview: null })
  const [category, setCategory] = useState('Tops')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    return () => {
      if (garment.preview) URL.revokeObjectURL(garment.preview)
      if (model.preview) URL.revokeObjectURL(model.preview)
    }
  }, [garment.preview, model.preview])

  const handleUpload = (kind: UploadKind) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setNotice('Please choose a valid image file.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setNotice('That image is larger than 10 MB. Please choose a smaller file.')
      return
    }

    const nextUpload = { file, preview: URL.createObjectURL(file) }
    if (kind === 'garment') setGarment(nextUpload)
    else setModel(nextUpload)
    setNotice('')
    event.target.value = ''
  }

  const handleGenerate = () => {
    if (!garment.file || !model.file) {
      setNotice('Add both images to prepare your virtual fitting.')
      return
    }
    setNotice('Your images are ready. We’ll connect the free AI try-on engine in the next development step.')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Fitting AI home">
          <span className="brand-mark">F<span>.</span></span>
          <span className="brand-name">FITTING<span>AI</span></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <a className="nav-item active" href="#studio">
            <svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></svg>
            <span>Virtual studio</span>
          </a>
          <a className="nav-item muted" href="#how-it-works">
            <svg viewBox="0 0 24 24"><path d="M4 5.5h16v13H4z" /><path d="M8 9h8M8 12h5M8 15h7" /></svg>
            <span>How it works</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="note-spark">✳</span>
            <p><strong>Made for better fit.</strong><br />A new way to see your style.</p>
          </div>
          <div className="profile">
            <div className="avatar">K</div>
            <div><strong>Your studio</strong><span>Personal workspace</span></div>
            <span className="profile-dots">···</span>
          </div>
        </div>
      </aside>

      <main className="main-content" id="studio">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>Virtual studio</strong></div>
          <div className="topbar-right">
            <span className="engine-status"><i /> AI ENGINE <b>COMING SOON</b></span>
            <button className="help-button" type="button" aria-label="Help">?</button>
          </div>
        </header>

        <div className="page-content">
          <section className="intro">
            <div>
              <div className="eyebrow"><span /> YOUR PERSONAL FITTING ROOM</div>
              <h1>See it on.<br /><em>Make it yours.</em></h1>
              <p className="intro-copy">Bring your favourite pieces to life. Upload a garment, choose your model, and get a glimpse of your next look.</p>
            </div>
            <div className="edition-stamp"><span>FIT</span><span>YOUR</span><span>VISION</span><i>✳</i></div>
          </section>

          <section className="studio-panel" aria-labelledby="studio-title">
            <div className="panel-top">
              <div>
                <div className="section-kicker">01 — START CREATING</div>
                <h2 id="studio-title">Build your look</h2>
              </div>
              <span className="step-progress"><b>1</b> OF 2 <span className="progress-line"><i /></span></span>
            </div>

            <div className="category-row">
              <span className="category-label">GARMENT TYPE</span>
              <div className="category-options" role="group" aria-label="Garment type">
                {categories.map((item) => (
                  <button key={item} type="button" className={category === item ? 'category-chip selected' : 'category-chip'} onClick={() => setCategory(item)}>{item}</button>
                ))}
              </div>
            </div>

            <div className="upload-grid">
              <UploadCard kind="garment" title="Upload a garment" description="A clear, front-facing product photo." upload={garment} onFileChange={handleUpload('garment')} />
              <div className="flow-connector" aria-hidden="true"><span>＋</span><i /></div>
              <UploadCard kind="model" title="Upload your model" description="A full-body photo works best." upload={model} onFileChange={handleUpload('model')} />
            </div>

            <div className="panel-footer">
              <div className="privacy-note"><svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg><span>Your images stay yours. Uploads are used for your fitting session.</span></div>
              <button className="generate-button" type="button" onClick={handleGenerate} disabled={!garment.file || !model.file}>
                <span>Prepare my look</span><span className="button-arrow">↗</span>
              </button>
            </div>
            {notice && <div className="notice" role="status">{notice}</div>}
          </section>

          <section className="below-grid" id="how-it-works">
            <div className="result-teaser">
              <div className="section-kicker">02 — THE RESULT</div>
              <div className="result-content">
                <div><h2>Your look,<br /><em>reimagined.</em></h2><p>Your virtual fitting preview will appear here once the AI engine is connected.</p></div>
                <div className="result-placeholder"><span className="placeholder-orbit orbit-one" /><span className="placeholder-orbit orbit-two" /><span className="placeholder-spark">✳</span><span className="placeholder-caption">YOUR NEXT LOOK</span></div>
              </div>
            </div>
            <div className="how-card">
              <div className="section-kicker">THE PROCESS</div>
              <h3>Good style.<br />Made personal.</h3>
              <div className="how-step"><span>01</span><p><strong>Choose your piece</strong><small>Upload the clothing you love.</small></p></div>
              <div className="how-step"><span>02</span><p><strong>Meet your fit</strong><small>Add a photo of your model.</small></p></div>
              <div className="how-step"><span>03</span><p><strong>See the possibility</strong><small>Preview your virtual look.</small></p></div>
            </div>
          </section>

          <footer className="page-footer"><span>FITTING AI © 2026</span><span>DESIGNED TO FIT YOUR VISION <i>✳</i></span></footer>
        </div>
      </main>
    </div>
  )
}

export default App
