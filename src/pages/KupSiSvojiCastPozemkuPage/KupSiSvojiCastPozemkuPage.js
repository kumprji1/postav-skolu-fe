import React, { Fragment, useState } from 'react'

import PozemekWebGlSection from './components/PozemekWebGlSection'
import Pozemek_SelectedToBuy from './components/Pozemek_SelectedToBuy';

const KupSiSvojiCastPozemkuPage = () => {
  const [loaded_O3, setLoaded_O3] = useState([]);
  const [loaded_O4, setLoaded_O4] = useState([]);  
  const [selectedToBuy, setSelectedToBuy] = useState([]);
  return (
    <Fragment>
        <PozemekWebGlSection setSelectedToBuy={setSelectedToBuy} loaded_O3={loaded_O3} loaded_O4={loaded_O4} />
        <Pozemek_SelectedToBuy selectedToBuy={selectedToBuy} />
        <p>Tady Dole začne další sekce{selectedToBuy}</p>
    </Fragment>
  )
}

export default KupSiSvojiCastPozemkuPage