import React ,{useState,useEffect} from 'react'
import millify from 'millify';
import { Input, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import{ useGetCryptosQuery }from '../services/cryptoApi'
const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100
  const {data:cryptosList,isFetching}=useGetCryptosQuery(count)
  // data:cryptosList: => rename data to cryptosList
  const [cryptos,setCryptos]=useState(cryptosList?.data?.coins)
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if(isFetching) return  <Loader />;

console.log('cryptos',cryptos)

  return (
  <>
    {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
  <Row gutter={[32,32]} className='crypto-card-container'>
{cryptos?.map((currency)=>(
  <Col sm={24} lg={12} xl={6} className='crypto-card' key={currency.uuid}
  >
    
<Link to={`/crypto/${currency.uuid}`}>

  <Card
  title={`${currency.rank}.${currency.name}`}
  extra={<img src={currency.iconUrl} className='crypto-image'/>}
  hoverable
  >
    <p> Price: {millify(currency.price)}</p>
    <p> Market Cap: {millify(currency.marketCap)}</p>
    <p> Daily Change: {millify(currency.change)}</p>


  </Card>
</Link>


  </Col>
))}
  </Row>
  
  </>
  )
}

export default Cryptocurrencies