import React from 'react';
import * as func from '../../providers/Functions';
import * as d3 from 'd3'

import * as _ from 'underscore';

import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


//http://recharts.org/en-US/examples/BrushBarChart
export class BrushBarChronicComponent extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data : this.props.data.getEvalMedicalRecords,
			modded : null
		}
		//console.log(this.props.data)
	}

	async dataWrangle(){
		var modData = this.state.data

		//get ages from date of births
		for(let i =0; i< modData.length; i++ ){
			modData[i].age = func.get_age(modData[i]['dob']);

			if(modData[i].chronic_condition_diabetes === 'Yes'){
				modData[i].chronic_condition_diabetes = 1
			}

			if(modData[i].chronic_condition_hypertension === 'Yes'){
				modData[i].chronic_condition_hypertension = 1
			}
			if(modData[i].chronic_condition_other === 'Yes'){
				modData[i].chronic_condition_other = 1
			}
		}

		var sexAgeDiabetes = d3.nest()
			//.key(function(d) { return d.sex; })
			.key(function(d) { return d.age; })
			.rollup(function(v) { return d3.sum(v, function(d) { return d.chronic_condition_diabetes; }); })
			.object(modData);
		var diabs = Object.entries(sexAgeDiabetes).map(([age, diabetes_count]) => ({age, diabetes_count}));




		var sexAgeHypertension = d3.nest()
			//.key(function(d) { return d.sex; })
			.key(function(d) { return d.age; })
			.rollup(function(v) { return d3.sum(v, function(d) { return d.chronic_condition_hypertension; }); })
			.object(modData);
		var hyps = Object.entries(sexAgeHypertension).map(([age, hypertension_count]) => ({age, hypertension_count}));
		
		
		
		
		var sexAgeOther= d3.nest()
			//.key(function(d) { return d.sex; })
			.key(function(d) { return d.age; })
			.rollup(function(v) { return d3.sum(v, function(d) { return d.chronic_condition_other; }); })
			.object(modData); 
		
		var others = Object.entries(sexAgeOther).map(([age, other_count]) => ({age, other_count}));
		//console.log(res3)
		

		var moddedData = _.map(diabs, function(element) {
			var treasure = _.findWhere(hyps, { age: element.age });
	  
			return _.extend(element, treasure);
	  });


	  //console.log(c)
		
		this.setState({
			modded:moddedData
		})
		//console.log(modData);
		
		
	}

	componentWillMount(){
		this.dataWrangle();
	}



	render () {
		return (
			<BarChart width={800} height={500} data={this.state.modded}
					margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="age"/>
				<YAxis/>
				<Tooltip/>
				<Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
				<ReferenceLine y={0} stroke='#000'/>
				<Brush dataKey='age' height={30} stroke="#8884d8"/>
				<Bar dataKey="diabetes_count" fill="#8884d8" />
				<Bar dataKey="hypertension_count" fill="#82ca9d" />
			</BarChart>
		);
	}
}