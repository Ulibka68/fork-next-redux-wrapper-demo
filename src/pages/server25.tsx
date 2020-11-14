import React from 'react';
import Link from 'next/link';
import {useSelector} from 'react-redux';
import {NextPage} from 'next';
import {State} from '../components/reducer';
import {wrapper} from '../components/store';

interface OtherProps {
    getServerSidePropVal: string;
    appProp: string;
}

const Server: NextPage<OtherProps> = ({appProp, getServerSidePropVal}) => {
    const {app, page} = useSelector<State, State>(state => state);
    return (
        <div className="server">
            <p>SERVER Page has access to store even though it does not dispatch anything itself</p>

            <pre>{JSON.stringify({ app_from_Redux:app,page_from_Redux: page, getServerSidePropVal, appProp}, null, 2)}</pre>

            <nav>
                <Link href="/">
                    <a>Navigate to index SERVER</a>
                </Link>
            </nav>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(({store}) => {
    store.dispatch({type: 'PAGE', payload: 'redux payload server'});
    return {props: {getServerSidePropVal: 'call from server 25 getServerSideProps func'}};
});

export default Server;
