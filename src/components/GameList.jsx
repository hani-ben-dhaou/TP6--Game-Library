import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import GameCard from './GameCard'
import { GamepadIcon, PlusIcon, SearchIcon } from './Icons'

const PLATFORMS = ['All', 'PC', 'PS5', 'Xbox', 'Nintendo Switch']

function GameList({ setGameToEdit, onAdd }) {
  // on recupere les jeux depuis le store
  const games = useSelector((state) => state.games)
  const [query, setQuery] = useState('')
  const [platform, setPlatform] = useState('All')

  const visibleGames = useMemo(() => {
    const search = query.trim().toLowerCase()

    return games.filter((game) => {
      const matchesPlatform = platform === 'All' || game.platform === platform
      const matchesSearch =
        search === '' ||
        game.title.toLowerCase().includes(search) ||
        game.genre.toLowerCase().includes(search)

      return matchesPlatform && matchesSearch
    })
  }, [games, query, platform])

  const hasFilters = query.trim() !== '' || platform !== 'All'

  const resetFilters = () => {
    setQuery('')
    setPlatform('All')
  }

  return (
    <section className="shell library" id="library">
      <div className="library-head">
        <div>
          <h2>
            My collection
            <span className="count-badge">{games.length}</span>
          </h2>
          <p className="section-sub">
            {games.length === 0
              ? 'Nothing here yet — your next favourite game is one click away.'
              : `Showing ${visibleGames.length} of ${games.length} title${games.length > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      <div className="library-toolbar">
        <label className="search-field">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or genre…"
            aria-label="Search games"
          />
          {query !== '' && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <div className="chips" role="group" aria-label="Filter by platform">
          {PLATFORMS.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip${platform === item ? ' is-active' : ''}`}
              onClick={() => setPlatform(item)}
              aria-pressed={platform === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {visibleGames.length > 0 ? (
        <div className="game-grid">
          {visibleGames.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              setGameToEdit={setGameToEdit}
              delay={index * 45}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <GamepadIcon />
          </div>
          <h3>{games.length === 0 ? 'Your vault is empty' : 'No games match your filters'}</h3>
          <p>
            {games.length === 0
              ? 'Add your first game and it will appear here, stored right in your Redux store.'
              : 'Try another title, clear the search or pick a different platform.'}
          </p>
          {games.length === 0 ? (
            <button type="button" className="btn-neon" onClick={onAdd}>
              <PlusIcon />
              Add your first game
            </button>
          ) : (
            hasFilters && (
              <button type="button" className="btn-ghost" onClick={resetFilters}>
                Reset filters
              </button>
            )
          )}
        </div>
      )}
    </section>
  )
}

export default GameList