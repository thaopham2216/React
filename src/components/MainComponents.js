import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
//Nucamp: import { Switch, Route, Redirect } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};
class Main extends Component {
    
    render() {
        const HomePage = () => { //arrow function inherit this.parentClass not reg function 
            return (
                <Home 
                    campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            ); 
        }; //locally scope component 

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                /> //+match.params.campsiteId the + operator in this case use to convert a string to number to compare id
            );
        };    

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />}/>
                    <Redirect to='/home' />
                </Switch>
                <Footer />
                {/* this called the directory page
                 <Directory campsites ={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
                    <CampsiteInfo campsite = {this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />
        */}
            </div>
        );
  }
}

export default withRouter(connect(mapStateToProps)(Main));





















// BEFORE WEEK 3 ASSIGNMENT START 
/*
import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
//Nucamp: import { Switch, Route, Redirect } from 'react-router-dom';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
        };
    }

    render() {
        const HomePage = () => { //arrow function inherit this.parentClass not reg function 
            return (
                <Home 
                    campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.state.partners.filter(partner => partner.featured)[0]}
                />
            ); 
        }; //locally scope component 

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                /> //+match.params.campsiteId the + operator in this case use to convert a string to number to compare id
            );
        };    

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
                
                // <Directory campsites ={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
                // <CampsiteInfo campsite = {this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />
            
            </div>
        );
  }
}

export default Main;
// the code below same as code above just different way to write it 
// export {App};

*/
// WEEK 3 ASSIGNMENT END 






// LEARNING NOTES 
/*
 onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId}); // in react, you NEVER want to update the state DIRECTLY
        // ex: this.state.selectedCampsite = campsite; never use = (assignment operator) to change the state
        //constructor is the only place that can only assign a property directly 
        // outside of constructor ALWAYS use set state
    }

*/
