import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addGame } from '../Redux/gamesSlice'
import { PlusIcon } from './Icons'

function AddGame({ onDone }) {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [platform, setPlatform] = useState('PC')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title === '' || genre === '' || price === '') {
      setError('Please fill in the title, genre and price fields.')
      return
    }

    dispatch(
      addGame({
        id: Date.now(),
        title: title,
        genre: genre,
        platform: platform,
        price: Number(price),
        image: image,
      })
    )

    setTitle('')
    setGenre('')
    setPlatform('PC')
    setPrice('')
    setImage('')
    setError('')

    if (onDone) onDone()
  }

  return (
    <form className="game-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field full">
          <label htmlFor="add-title">Title</label>
          <input
            id="add-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Elden Ring"
          />
        </div>

        <div className="form-field">
          <label htmlFor="add-genre">Genre</label>
          <input
            id="add-genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g. Action RPG"
          />
        </div>

        <div className="form-field">
          <label htmlFor="add-platform">Platform</label>
          <select
            id="add-platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option>PC</option>
            <option>PS5</option>
            <option>Xbox</option>
            <option>Nintendo Switch</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="add-price">Price (DT)</label>
          <input
            id="add-price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="70"
          />
        </div>

        <div className="form-field">
          <label htmlFor="add-image">Image URL</label>
          <input
            id="add-image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://…"
          />
        </div>

        <div className="form-field full">
          <div className="image-preview">
            <span>Image preview</span>
            {image !== '' && (
              <img
                src={image}
                alt=""
                onLoad={(event) => {
                  event.currentTarget.style.opacity = '1'
                }}
                onError={(event) => {
                  event.currentTarget.style.opacity = '0'
                }}
              />
            )}
          </div>
        </div>
      </div>

      {error !== '' && (
        <p className="form-note" role="alert" style={{ color: '#fca5a5' }}>
          {error}
        </p>
      )}
      <p className="form-note">
        The new game is pushed straight into the Redux store with <code>addGame</code>.
      </p>

      <div className="form-actions">
        <button type="button" className="btn-ghost" onClick={onDone}>
          Cancel
        </button>
        <button type="submit" className="btn-neon">
          <PlusIcon />
          Add game
        </button>
      </div>
    </form>
  )
}

export default AddGame