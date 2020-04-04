// import React from 'react';

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
// import CompLibrary from '../../core/CompLibrary.js';

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
	render() {
		const { siteConfig, language = '' } = this.props;
		const { baseUrl, docsUrl } = siteConfig;
		const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
		const langPart = `${language ? `${language}/` : ''}`;
		const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

		const SplashContainer = (props) => (
			<div className='homeContainer'>
				<div className='homeSplashFade'>
					<div className='wrapper homeWrapper'>{props.children}</div>
				</div>
			</div>
		);

		const Logo = (props) => (
			<div className='projectLogo'>
				<img src={props.img_src} alt='Project Logo' />
			</div>
		);

		const ProjectTitle = (props) => (
			<h2 className='projectTitle'>
				{props.title}
				<h3>{props.tagline}</h3>
			</h2>
		);

		const PromoSection = (props) => (
			<div className='section promoSection'>
				<div className='promoRow'>
					<div className='pluginRowBlock'>{props.children}</div>
				</div>
			</div>
		);

		const Button = (props) => (
			<div className='pluginWrapper buttonWrapper'>
				<a className='button' href={props.href} target={props.target}>
					{props.children}
				</a>
			</div>
		);

		return (
			<SplashContainer>
				<Logo img_src={`${baseUrl}img/headshot.png`} />
				<div className='inner'>
					<ProjectTitle
						tagline={siteConfig.tagline}
						title={siteConfig.title}
						about={siteConfig.about}
					/>

					<PromoSection>
						<i className='fab fa-react fa-3x fa-spin' />
						<i className='fab fa-js fa-3x' />
						<i className='fab fa-node fa-3x' />
					</PromoSection>
					<h3>
						<a className='button' href='docs/about'>
							Learn More
						</a>
					</h3>
				</div>
			</SplashContainer>
		);
	}
}

class Index extends React.Component {
	render() {
		const { config: siteConfig, language = '' } = this.props;
		const { baseUrl } = siteConfig;

		const Block = (props) => (
			<Container
				padding={['bottom', 'top']}
				id={props.id}
				background={props.background}
			>
				<GridBlock
					align='center'
					contents={props.children}
					layout={props.layout}
				/>
			</Container>
		);

		const FeatureCallout = () => (
			<div
				className='productShowcaseSection paddingBottom'
				style={{ textAlign: 'center' }}
			>
				<MarkdownBlock>
					I'm a Software developer with a background in Classical Music. I enjoy
					card games, cooking and Wikipedia rabbit holes.
				</MarkdownBlock>
			</div>
		);

		const Features = () => (
			<Block layout='fourColumn'>
				{[
					{
						content: 'Knowledgebase',
						image: `${baseUrl}img/undraw_react.svg`,
						imageAlign: 'top',
						title: 'Knowledgebase',
					},
					{
						content: 'The content of my second feature',
						image: `${baseUrl}img/undraw_operating_system.svg`,
						imageAlign: 'top',
						title: 'Feature Two',
					},
				]}
			</Block>
		);

		return (
			<div>
				<HomeSplash siteConfig={siteConfig} language={language} />
				<div className='mainContainer'>{/* <Features></Features> */}</div>
			</div>
		);
	}
}

module.exports = Index;
