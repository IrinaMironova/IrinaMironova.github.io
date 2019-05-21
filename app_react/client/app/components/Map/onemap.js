/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-restricted-globals */
import React from 'react';
import DG from '2gis-maps';
import { getFromStorage } from '../../utils/storage';
import List from '../List/list';

class Onemap extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            center: [46.454923199999996, 30.7376994],
            dgElement: null,
            pos: [],
            isShown: false,
            marker: null,
            group: DG.featureGroup(),
        };
        this.onClickMap = this.onClickMap.bind(this);
        this.ShowHideMarkers = this.ShowHideMarkers.bind(this);
        this.saveMarkers = this.saveMarkers.bind(this);
    }

    componentDidMount() {
        const { container } = this.refs;
        const {
            zoom,
            center,
            group,
            pos,
            isShown,
        } = this.state;
        const options = { zoom, center };

        const dgElement = DG.map(container, options);
        dgElement.on('click', this.onClickMap);

        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            fetch(`/api/account/load?token=${token}`)
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    pos: res,
                    dgElement,
                });
                res.forEach((item) => {
                    this.setState({
                        marker: DG.marker(item).addTo(group),
                    });
                });
            });
        } else {
            dgElement.locate({ setView: true, watch: true })
                    .on('locationfound', (e) => {
                        const location = DG.marker([e.latitude, e.longitude]);
                        location.addTo(dgElement);
                    })
                    .on('locationerror', () => {
                        DG.popup()
                          .setLatLng(dgElement.getCenter())
                          .setContent('Доступ к определению местоположения отключён')
                          .openOn(dgElement);
                    });
                    this.setState({
                        dgElement,
                        marker: location || null,
                        pos,
                    });
        }
        if (!isShown) {
                this.setState({
                    group: group.addTo(dgElement),
                });
            }
    }

    onClickMap = (e) => {
        const {
            pos,
            dgElement,
            isShown,
            group,
        } = this.state;
        this.setState({
            pos: [[e.latlng.lat, e.latlng.lng], ...pos],
            marker: DG.marker([e.latlng.lat, e.latlng.lng]).addTo(group),
        });
        if (!isShown) {
            this.setState({
                group: group.addTo(dgElement),
            });
        }
    }

    ShowHideMarkers() {
        const {
            dgElement,
            isShown,
            group,
        } = this.state;
        this.setState({
            isShown: !isShown,
        });
        if (isShown) {
            this.setState({
                group: group.addTo(dgElement),
             });
        } else {
            this.setState({
                group: group.removeFrom(dgElement),
            });
        }
    }

    saveMarkers() {
        const obj = getFromStorage('the_main_app');
        const { pos } = this.state;
        if (obj && obj.token) {
            const { token } = obj;
            fetch(`/api/account/save?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    groupMarkers: pos,
                }),
            });
        } else {
            alert('please sign in');
        }
    }

    render() {
        return (
            <React.Fragment>
                <div
                  ref="container"
                  style={{ width: '90%', height: '500px', margin: '0 auto' }}
                />
                <div className="btn_map">
                    <button type="button" onClick={this.saveMarkers}> Save </button>
                    <button type="button" onClick={this.ShowHideMarkers}> Hide/Show </button>
                </div>
                <List />
            </React.Fragment>
        );
    }
}

export default Onemap;
