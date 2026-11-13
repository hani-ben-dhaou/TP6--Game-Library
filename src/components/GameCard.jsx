import { useDispatch } from 'react-redux'
import { deleteGame } from '../Redux/gamesSlice'
import { MonitorIcon, PencilIcon, TrashIcon } from './Icons'

function GameCard({ game, setGameToEdit, delay = 0 }) {
  const dispatch = useDispatch()

  return (
    <article className="game-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="game-card-media">
        {game.image ? (
          <img
            src={game.image}
            alt={`Cover of ${game.title}`}
            loading="lazy"
            decoding="async"
            onLoad={(event) => {
              event.currentTarget.style.opacity = '1'
            }}
            onError={(event) => {
              event.currentTarget.style.opacity = '0'
            }}
          />
        ) : (
          <span className="game-card-placeholder" aria-hidden="true">
            🎮
          </span>
        )}
        <span className="badge-genre">{game.genre}</span>
      </div>

      <div className="game-card-body">
        <div className="game-title-row">
          <h3 title={game.title}>{game.title}</h3>
          <span className="game-price">
            {game.price}
            <small>DT</small>
          </span>
        </div>

        <div className="game-meta">
          <span className="meta-item">
            <MonitorIcon />
            {game.platform}
          </span>
        </div>

        <div className="game-actions">
          <button type="button" className="btn-ghost" onClick={() => setGameToEdit(game)}>
            <PencilIcon />
            Edit
          </button>
          <button
            type="button"
            className="btn-ghost danger"
            onClick={() => dispatch(deleteGame(game.id))}
          >
            <TrashIcon />
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default GameCard