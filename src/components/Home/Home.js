import React from 'react';
import { withNamespaces , Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';

function Home() {    
    return (
        <ContentWrapper>
            <div className="content-heading">
                <div>Inicio
                    <small><Trans i18nKey='dashboard.WELCOME'></Trans></small>
                </div>
            </div>
        </ContentWrapper>
    );
}

export default withNamespaces('translations')(Home);