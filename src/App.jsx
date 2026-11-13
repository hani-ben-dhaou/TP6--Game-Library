import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import GameList from './components/GameList'
import AddGame from './components/AddGame'
import EditGame from './components/EditGame'
import { GamepadIcon, PlusIcon } from './components/Icons'

function App() {
  // le jeu qu'on veut modifier (null = pas de modification)
  const [gameToEdit, setGameToEdit] = useState(null)
  // ouverture / fermeture du panneau de formulaire
  const [isFormOpen, setIsFormOpen] = useState(false)

  // lecture de l'etat global (meme source que GameList)
  const games = useSelector((state) => state.games)

  const totalValue = games.reduce((sum, game) => sum + (Number(game.price) || 0), 0)
  const platformCount = new Set(games.map((game) => game.platform)).size

  const openAddForm = () => {
    setGameToEdit(null)
    setIsFormOpen(true)
  }

  const openEditForm = (game) => {
    setGameToEdit(game)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setGameToEdit(null)
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="shell topbar-inner">
          <a className="brand" href="#library">
            <span className="brand-mark">
              <GamepadIcon />
            </span>
            <span className="brand-text">
              <strong>
                Game<span className="brand-accent">Vault</span>
              </strong>
              <small>Collection manager</small>
            </span>
          </a>

          <div className="topbar-actions">
            <span className="status-pill">
              <span className="status-dot" />
              Redux connected
            </span>
            <button type="button" className="btn-neon" onClick={openAddForm}>
              <PlusIcon />
              Add game
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="shell hero">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="dot" />
              Redux Toolkit · TP6
            </span>
            <h1>
              Your games.
              <br />
              <span className="grad-text">One vault.</span>
            </h1>
            <p className="lede">
              A curated shelf for every title you own — add new releases, tweak the details and
              keep your collection spotless. Everything lives in a single Redux store.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn-neon" onClick={openAddForm}>
                <PlusIcon />
                Add a game
              </button>
              <a className="btn-ghost" href="#library">
                Browse library
              </a>
            </div>
          </div>

          <div className="stats">
            <div className="stat-card">
              <span className="stat-label">Games owned</span>
              <span className="stat-value">{games.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Collection value</span>
              <span className="stat-value">
                {totalValue.toLocaleString('fr-FR')}
                <span className="unit">DT</span>
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Platforms</span>
              <span className="stat-value">{platformCount}</span>
            </div>
          </div>
        </section>

        <GameList setGameToEdit={openEditForm} onAdd={openAddForm} />
      </main>

      <footer className="site-footer">
        <div className="shell">

        </div>
      </footer>

      <Modal
        show={isFormOpen}
        onHide={closeForm}
        centered
        size="lg"
        className="game-modal"
        contentClassName="game-modal-content"
        aria-labelledby="game-form-title"
      >
        <Modal.Header closeButton>
          <div>
            <p className="modal-kicker">{gameToEdit ? 'Update entry' : 'New entry'}</p>
            <h2 className="modal-title" id="game-form-title">
              {gameToEdit ? 'Edit game' : 'Add a game'}
            </h2>
          </div>
        </Modal.Header>
        <Modal.Body>
          {gameToEdit ? (
            <EditGame
              key={gameToEdit.id}
              game={gameToEdit}
              closeEdit={closeForm}
            />
          ) : (
            <AddGame onDone={closeForm} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default App