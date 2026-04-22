import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(CustomEase, ScrollTrigger)
CustomEase.create('monolith', '0.8, 0, 0.1, 1')

export { gsap, ScrollTrigger, CustomEase }
