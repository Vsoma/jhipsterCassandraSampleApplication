import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { JhipsterCassandraSampleApplicationSharedModule, UserRouteAccessService } from './shared';
import { JhipsterCassandraSampleApplicationAppRoutingModule} from './app-routing.module';
import { JhipsterCassandraSampleApplicationHomeModule } from './home/home.module';
import { JhipsterCassandraSampleApplicationAdminModule } from './admin/admin.module';
import { JhipsterCassandraSampleApplicationAccountModule } from './account/account.module';
import { JhipsterCassandraSampleApplicationEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { StateStorageService } from './shared/auth/state-storage.service';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        JhipsterCassandraSampleApplicationAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        JhipsterCassandraSampleApplicationSharedModule,
        JhipsterCassandraSampleApplicationHomeModule,
        JhipsterCassandraSampleApplicationAdminModule,
        JhipsterCassandraSampleApplicationAccountModule,
        JhipsterCassandraSampleApplicationEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                StateStorageService,
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class JhipsterCassandraSampleApplicationAppModule {}
