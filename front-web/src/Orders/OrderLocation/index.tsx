import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchLocalMapBox } from '../../Api';
import AsyncSelect from 'react-select/async';
import { OrderLocationData } from '../types';
import React from 'react';

var initialLocation = { 
  label: 'Aguardando localização...', 
  position: { lat: 0, lng: 0 }
};

type Place = {
  label?: string;
  value?: string;
  position: {
    lat: number,
    lng: number
  }
}

type Props = {
  onChangeLocation: (location: OrderLocationData) => void;
}

function OrderLocation({ onChangeLocation }: Props) {
  const [address, setAddress] = useState<Place>(initialLocation);
  
  useEffect(() => {
    (() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {          
          setAddress({
            label: 'Você está aqui!',
            position: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            }});
        });
      }
    })();
  },[]);

  async function loadOptions(inputValue: string, callback: (places: Place[]) => void) {
    // {loadOptions} em AsyncSelect executa este loadOptions() a cada letra digitada
    // inputValue é padrão de AsyncSelect, armazena CADA letra digitada que loadOptions executa
    const response = await fetchLocalMapBox(inputValue);

    const places = response.data.features.map((item: any) => {
      return ({
        // LABEL é padrão de AsyncSelect, armazena e mostra as opções select
        label: item.place_name,
        value: item.place_name,
        position: {
          lat: item.center[1],
          lng: item.center[0]
        },
      });
    });

    callback(places);
  };

  function handleChangeSelect(place: Place): void {
    setAddress(place);
    // Aqui, assim que SELECIONARMOS na lista do select o endereço que queremos,
    // o handleSelect pega o value (que são os mesmos dados de place) para que
    // a função onChangeLocation popule latitude, longitude address 
    // para serem repassadas pro BACKEND posteriormente, onde precisa
    // desses dados para emitir a Order (Pedido), que através do componente
    // filho (este componente aqui /OrderLocation/) vai ser enviado pro
    // componente PAI (/Orders/) pelo Props, esta função onChangeLocation, 
    // que vai ENVIAR esses dados aqui abaixo, através do location =>
    // onChangeLocation={location => setOrderLocation(location)}
    // e populando o const [orderLocation, set...] pelo setOrderLocation()
    // assim, o [orderLocation] de useState vamos usar pra mandar pro backend.
    onChangeLocation({
      latitude: place.position.lat,
      longitude: place.position.lng,
      address: place.label! 
      // como label? pode ser opcional, '!' garanto ao TS q ele virá preenchido
    });
  };

  return (
    <React.StrictMode>
      <div className="order-location-container">
        <div className="order-location-content">
          <h3 className="order-location-title">
            Selecione onde o pedido deve ser entregue:
          </h3>
          <div className="filter-container">
            <AsyncSelect
              placeholder="Digite o endereço para a entrega do pedido"
              className="filter"
              loadOptions={loadOptions} // a cada ESCRITA, ele pega o input e executa loadOptions(inputValue)
              onChange={value => {
                handleChangeSelect(value as Place)
                //ao SELECIONAR de fato a opção do select, o value retornado é os de Place
              }} 
            />
          </div>
          <MapContainer 
            center={address.position} 
            zoom={15} 
            key={address.position.lat}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={address.position}>
              <Popup>
                {address.label}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default OrderLocation;