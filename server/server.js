"use strict";

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const parser = bodyparser();

app.use('/', express.static('client'));

