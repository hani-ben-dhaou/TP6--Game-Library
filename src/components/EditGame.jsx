import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateGame } from '../Redux/gamesSlice'
import { SaveIcon } from './Icons'

function EditGame(props) {
  const dispatch = useDispatch()

  // on charge les infos du jeu selectionne dans le formulaire
  const [title, setTitle] = useState(props.game.title)
  const [genre, setGenre] = useState(props.game.genre)
  const [platform, setPlatform] = useState(props.game.platform)
  const [price, setPrice] = useState(props.game.price)
  const [image, setImage] = useState(props.game.image)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      updateGame({
        id: props.game.id,
        title: title,
        genre: genre,
        platform: platform,
        price: Number(price),
        image: image,
      })
    )

    props.closeEdit()
  }

  return (
    <form className="game-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field full">
          <label htmlFor="edit-title">Title</label>
          <input
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Game title"
          />
        </div>

        <div className="form-field">
          <label htmlFor="edit-genre">Genre</label>
          <input
            id="edit-genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g. Shooter"
          />
        </div>

        <div className="form-field">
          <label htmlFor="edit-platform">Platform</label>
          <select
            id="edit-platform"
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
          <label htmlFor="edit-price">Price (DT)</label>
          <input
            id="edit-price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="form-field">
          <label htmlFor="edit-image">Image URL</label>
          <input
            id="edit-image"
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

      <p className="form-note">
        Saving replaces the matching entry in the store through <code>updateGame</code>.
      </p>

      <div className="form-actions">
        <button type="button" className="btn-ghost" onClick={props.closeEdit}>
          Cancel
        </button>
        <button type="submit" className="btn-neon">
          <SaveIcon />
          Save changes
        </button>
      </div>
    </form>
  )
}

export default EditGame