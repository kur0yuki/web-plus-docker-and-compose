CREATE TABLE "kupipodariday"."wish"
(
    "id"        SERIAL            NOT NULL,
    "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
    "name"      character varying NOT NULL,
    "link"      character varying NOT NULL,
    "image"     character varying NOT NULL,
    "price"     integer           NOT NULL,
    "raised"    integer           NOT NULL default 0,
    "copied"    integer           NOT NULL DEFAULT '0',
    "ownerId"   integer,
    CONSTRAINT "PK_e338d8f62014703650439326d3a" PRIMARY KEY ("id")
);
CREATE TABLE "kupipodariday"."wishlist"
(
    "id"          SERIAL            NOT NULL,
    "createdAt"   TIMESTAMP         NOT NULL DEFAULT now(),
    "updatedAt"   TIMESTAMP         NOT NULL DEFAULT now(),
    "name"        character varying NOT NULL,
    "description" character varying NOT NULL DEFAULT 'None',
    "image"       character varying NOT NULL,
    "ownerId"     integer,
    CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id")
);
CREATE TABLE "kupipodariday"."user"
(
    "id"        SERIAL                NOT NULL,
    "createdAt" TIMESTAMP             NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP             NOT NULL DEFAULT now(),
    "username"  character varying(30) NOT NULL,
    "password"  character varying     NOT NULL,
    "email"     character varying     NOT NULL,
    "avatar"    character varying     NOT NULL DEFAULT 'https://i.pravatar.cc/300',
    "about"     character varying     NOT NULL DEFAULT 'Пока ничего не рассказал о себе',
    CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);
CREATE TABLE "kupipodariday"."offer"
(
    "id"        SERIAL    NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    "amount"    integer   NOT NULL default 0,
    "hidden"    boolean   NOT NULL,
    "userId"    integer,
    "itemId"    integer,
    CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id")
);
CREATE TABLE "kupipodariday"."wishlist_items_wish"
(
    "wishlistId" integer NOT NULL,
    "wishId"     integer NOT NULL,
    CONSTRAINT "PK_bf04498b7fc0b487b15d3b62db0" PRIMARY KEY ("wishlistId", "wishId")
);
CREATE INDEX "IDX_e686abff4343ad90ca53a7fc12" ON "kupipodariday"."wishlist_items_wish" ("wishlistId");
CREATE INDEX "IDX_20a447bbd8b2e0c58b420300d4" ON "kupipodariday"."wishlist_items_wish" ("wishId");
ALTER TABLE "kupipodariday"."wish"
    ADD CONSTRAINT "FK_d976be560c304e5396c50bd72c4" FOREIGN KEY ("ownerId") REFERENCES "kupipodariday"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "kupipodariday"."wishlist"
    ADD CONSTRAINT "FK_acf92a9b67b36657847695751ba" FOREIGN KEY ("ownerId") REFERENCES "kupipodariday"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "kupipodariday"."offer"
    ADD CONSTRAINT "FK_e8100751be1076656606ae045e3" FOREIGN KEY ("userId") REFERENCES "kupipodariday"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "kupipodariday"."offer"
    ADD CONSTRAINT "FK_40199af67b763fc3ecc5a0d44e0" FOREIGN KEY ("itemId") REFERENCES "kupipodariday"."wish" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "kupipodariday"."wishlist_items_wish"
    ADD CONSTRAINT "FK_e686abff4343ad90ca53a7fc122" FOREIGN KEY ("wishlistId") REFERENCES "kupipodariday"."wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "kupipodariday"."wishlist_items_wish"
    ADD CONSTRAINT "FK_20a447bbd8b2e0c58b420300d4d" FOREIGN KEY ("wishId") REFERENCES "kupipodariday"."wish" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "kupipodariday"."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username");
