import React from 'react';
import { Slide } from '../../components/carousel/Carousel';
import './home.scss'
import { ProductList } from './components/ProductList';
import { BrandsList } from './components/BrandsList';
import { OfferList } from './components/OfferList';

export function Home() {
  return (
    <>
      <main>
        <Slide />
        
        <section className='mainDep'>
            <h2>Principais Departamentos</h2>

          <div className="containerDeps">
            <div className='gridItem item1'>
              <img src="" alt="" />
              <h3>Computadores Gamers</h3>
            </div>

            <div className='gridItem item2'>
              <img src="" alt="" />
              <h3>Notebook e Portáteis</h3>
            </div>

            <div className='gridItem item3'>
              <img src="" alt="" />
              <h3>Kit Upgrade</h3>
            </div>

            <div className='gridItem item4'>
              <img src="" alt="" />
              <h3>Periféricos</h3>
            </div>
            
            <div className='gridItem item5'>
              <img src="" alt="" />
              <h3>Monitores</h3>
            </div>

            <div className='gridItem item6'>
              <img src="" alt="" />
              <h3>Video Games</h3>
            </div>
        
          </div>
        </section>

        <section className='offers'>
          <h2>Ofertas</h2>
          <OfferList  />
        </section>

        <section className='mainProds'>
          <h2>Principais Produtos</h2>
          <ProductList />
        </section>

        <section className='brands'>
          <h2>Principais Marcas</h2>
          <BrandsList />
        </section>
      </main>
    </>
  )
}