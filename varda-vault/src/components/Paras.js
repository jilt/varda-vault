import ListParas from './ListParas'

const Paras = ({ paras }) => {


	return (
		<ul className='paras-listings'>
			{paras.map((item) => (
				<ListParas key={item.id} item={item} 
				/>
				))}
		</ul>
	)
}


export default Paras