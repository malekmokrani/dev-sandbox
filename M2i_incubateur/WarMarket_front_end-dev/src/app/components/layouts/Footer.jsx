import React from 'react';
import logo from '../../assets/images/icones/logo/warhammer-shop-logo.png';
import { Link } from 'react-router-dom';
import Tumblr from './../../shared/components/logos/Tumblr';
import Instagram from './../../shared/components/logos/Instagram';
import Twitter from './../../shared/components/logos/Twitter';
import Facebook from './../../shared/components/logos/Facebook';


function Footer() {
    return (
        <footer className="">
            <div className="footer sm:flex sm:flex-col sm:items-center sm:p-2 md:flex md:flex-row md:items-start">
                <div className="p-2 md:w-1/2">
                    <div className="p-2">
                        <h2 className="font-bold uppercase">Newsletter</h2>
                        <p>pour recevoir les annonces des nouveautés ainsi que se tenir au courant des offres et promotions</p>
                    </div>
                    <div className="p-2">
                        <input type="email" name="" id="" placeholder="Mail" className="inputNewsletter" />
                        <button type="submit" className="newsletter ml-2">S'abonner</button>
                    </div>
                </div>
                <div className="p-2 font-bold md:w-1/2">
                    <div className="flex justify-center p-2">
                        <h2>Nos réseaux sociaux</h2>
                    </div>
                    <div className="flex justify-center">
                        <div className="p-2">
                            <Facebook />
                        </div>
                        <div className="p-2">
                            <Instagram />
                        </div>
                        <div className="p-2">
                            <Twitter />
                        </div>
                        <div className="p-2">
                            <Tumblr />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer2 sm:flex sm:flex-col sm:items-center p-4 md:flex md:flex-row md:justify-evenly md:items-start md:p-2">
                <div className="">
                    <h2 className="font-bold uppercase pb-2">Contact</h2>
                    <Link to="/">
                        <p className="md:pt-1">Livraison</p>
                    </Link>
                    <Link to="/">
                        <p className="md:pt-1">Retour</p>
                    </Link>
                    <Link to="/">
                        <p className="md:pt-1">Mentions légales</p>
                    </Link>
                    <Link to="/">
                        <p className="md:pt-1">A propos</p>
                    </Link>
                    <Link to="/">
                        <p className="md:pt-1">Cookies</p>
                    </Link>
                </div>
                <div className="">
                    <h2 className="font-bold uppercase pt-2 pb-2">Nos produits</h2>
                    <Link to="/">
                        <p className="md:pt-1">Figurines</p>
                    </Link>
                    <Link to="/">
                        <p className="md:pt-1">Peintures</p>
                    </Link>
                    <Link to="/">
                        <p className="md:pt-1">Livres</p>
                    </Link>
                    <Link to="/">
                        <p className="md:pt-1">Guides de jeux</p>
                    </Link>
                </div>
                <div className="">
                    <h2 className="font-bold uppercase pt-2 pb-2">Compte</h2>
                    <Link to="/">
                        <p className="md:pt-1">Informations personnelles</p>
                    </Link>
                    <Link to="/">
                        <p className="md:pt-1">Commandes</p>
                    </Link>
                    <Link to="/">
                        <p className="md:pt-1">Retour produits</p>
                    </Link>
                    <Link to="/">
                        <p className="md:pt-1">Adresses</p>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
