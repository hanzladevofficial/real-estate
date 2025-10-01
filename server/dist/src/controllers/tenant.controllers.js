"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenant = exports.createTenant = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        const tenant = yield prisma.tenant.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            },
        });
        res.status(201).json(tenant);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: `Error creating tenant: ${error.message}` });
        }
        else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.createTenant = createTenant;
const getTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId } = req.params;
        const tenant = yield prisma.tenant.findUnique({
            where: {
                cognitoId,
            },
            include: {
                favorites: true,
            },
        });
        if (tenant) {
            res.json(tenant);
        }
        else {
            res.status(404).json({ mesage: "Tenant not found." });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: `Error retrieving tenant: ${error.message}` });
        }
        else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.getTenant = getTenant;
