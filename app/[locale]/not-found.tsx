import './not-found.scss'
export default async function NotFound() {
  return (
    <div id='not-found-wrapper' className='desktop:h-96'>
      <section id='not-found'>
        <div id='title'>Simple Pure CSS3 &bull; 404 Error Page</div>
        <div className='circles'>
          <p>
            404
            <br />
            <small>PAGE NOT FOUND</small>
          </p>
          <span className='circle big'></span>
          <span className='circle med'></span>
          <span className='circle small'></span>
        </div>
      </section>
    </div>
  )
}
