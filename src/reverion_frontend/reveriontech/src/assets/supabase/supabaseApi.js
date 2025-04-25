import axios from 'axios'

const supabaseApi = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
		
	},
	withCredentials: true
})
  
export default supabaseApi